#!/usr/bin/env python3
"""Builds the launch social media kit as SVG, then exports PNGs with Inkscape.

Everything is assembled from real assets: the app screenshot, the Dottra
symbol, and the official Google Play badge (embedded as an image, never
redrawn). Flat brand colours only, no gradients or filters.

Run:  python3 scripts/build-social.py
Out:  brand/social/svg/*.svg (editable in Inkscape) and brand/social/*.png
"""

import base64
import shutil
import subprocess
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand" / "source"
OUT = ROOT / "brand" / "social"
SVG_OUT = OUT / "svg"

BLUE = "#464bd6"
DARK = "#11143a"
SOFT = "#f0f1ff"
WHITE = "#ffffff"
MUTED = "#c9cbf4"
FONT = "Inter, 'Liberation Sans', Arial, sans-serif"


def data_uri(path: Path) -> str:
    return "data:image/png;base64," + base64.b64encode(path.read_bytes()).decode("ascii")


SCREEN = data_uri(SRC / "dottra-screenshot.png")          # 1024 x 2195, phone frame, transparent edges
SYMBOL_WHITE = data_uri(SRC / "dottra-symbol-white.png")  # 432 x 432, symbol bbox (113,142)-(324,292)
SYMBOL_DARK = data_uri(ROOT / "public" / "dottra-symbol-light.png")  # 309 x 221, dark symbol
BADGE = data_uri(ROOT / "public" / "google-play-badge.png")  # 646 x 250, visible area (41,41)-(605,209)

SCREEN_W, SCREEN_H = 1024, 2195
BADGE_W, BADGE_H = 646, 250
BADGE_BOX = (41, 41, 605, 209)


def svg(width: int, height: int, body: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
        f'width="{width}" height="{height}" viewBox="0 0 {width} {height}">\n{body}\n</svg>\n'
    )


def rect(x, y, w, h, fill, rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"/>'


def text(x, y, lines, size, weight=700, fill=WHITE, leading=1.15, anchor="start", spacing=0):
    if isinstance(lines, str):
        lines = [lines]
    out = []
    for i, line in enumerate(lines):
        out.append(
            f'<text x="{x}" y="{y + i * size * leading:.1f}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{spacing}">{escape(line)}</text>'
        )
    return "\n".join(out)


def phone(x, y, height):
    """The screenshot, scaled to `height`, top-left at (x, y)."""
    w = SCREEN_W * height / SCREEN_H
    return f'<image x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{height}" xlink:href="{SCREEN}"/>', w


def badge(x, y, visible_width):
    """Official Google Play badge; (x, y) is the top-left of its visible black area."""
    bx0, by0, bx1, by1 = BADGE_BOX
    s = visible_width / (bx1 - bx0)
    return (
        f'<image x="{x - bx0 * s:.1f}" y="{y - by0 * s:.1f}" width="{BADGE_W * s:.1f}" '
        f'height="{BADGE_H * s:.1f}" xlink:href="{BADGE}"/>'
    ), (by1 - by0) * s


def symbol_white(cx, cy, width):
    """White Dottra symbol centred on (cx, cy), drawn `width` wide."""
    bx0, by0, bx1, by1 = 113, 142, 324, 292
    s = width / (bx1 - bx0)
    ox = cx - (bx0 + bx1) / 2 * s
    oy = cy - (by0 + by1) / 2 * s
    return f'<image x="{ox:.1f}" y="{oy:.1f}" width="{432 * s:.1f}" height="{432 * s:.1f}" xlink:href="{SYMBOL_WHITE}"/>'


def wordmark_on_blue(x, y, size=40):
    """White tile with the dark symbol, then 'Dottra' in white. For blue backgrounds."""
    tile = size * 1.6
    sw = tile * 0.66
    sh = sw * 221 / 309
    return "\n".join([
        rect(x, y, tile, tile, WHITE, rx=tile * 0.22),
        f'<image x="{x + (tile - sw) / 2:.1f}" y="{y + (tile - sh) / 2:.1f}" width="{sw:.1f}" height="{sh:.1f}" xlink:href="{SYMBOL_DARK}"/>',
        text(x + tile + size * 0.45, y + tile * 0.68, "Dottra", size, 700, WHITE),
    ])


def wordmark(x, y, size=40, on_dark=True):
    """Blue tile with the white symbol, then 'Dottra'."""
    tile = size * 1.6
    parts = [
        rect(x, y, tile, tile, BLUE if on_dark else BLUE, rx=tile * 0.22),
        symbol_white(x + tile / 2, y + tile / 2, tile * 0.62),
        text(x + tile + size * 0.45, y + tile * 0.68, "Dottra", size, 700, WHITE if on_dark else DARK),
    ]
    return "\n".join(parts)


# ---------------------------------------------------------------------------
# Designs
# ---------------------------------------------------------------------------

def profile_logo():
    # Square, safe for the circular crop used by LinkedIn, Facebook and Instagram.
    return svg(1080, 1080, rect(0, 0, 1080, 1080, BLUE) + symbol_white(540, 540, 600))


def launch_post():
    w = h = 1080
    ph, pw = phone(0, 0, 940)[1], None
    img, pw = phone(w - 80 - SCREEN_W * 940 / SCREEN_H, 90, 940)
    b, bh = badge(80, 820, 330)
    body = [
        rect(0, 0, w, h, DARK),
        rect(0, 0, 14, h, BLUE),
        wordmark(80, 80, 34),
        text(80, 300, "NOW ON GOOGLE PLAY", 24, 700, MUTED, spacing=3),
        text(80, 390, ["Dottra is", "live."], 92, 800, WHITE, 1.05),
        text(
            80,
            580,
            ["A credit facility for", "salaried workers and", "sponsored students", "in Zambia."],
            34, 500, SOFT, 1.35,
        ),
        b,
        text(80, 1020, "dottra.co", 26, 600, MUTED),
        img,
    ]
    return svg(w, h, "\n".join(body))


def launch_story():
    # Based on the Inkscape template layout: headline top left, logo circle top
    # right, phone centred, details at the bottom. Flat colours instead of the glow.
    w, h = 1080, 1920
    img, pw = phone(0, 0, 1180)
    img, pw = phone((w - SCREEN_W * 1180 / SCREEN_H) / 2, 470, 1180)
    b, bh = badge((w - 400) / 2, 1700, 400)
    body = [
        rect(0, 0, w, h, DARK),
        rect(0, 1240, w, h - 1240, BLUE),
        text(76, 180, ["Credit you can draw,", "pay back and use", "again."], 66, 800, WHITE, 1.1),
        text(76, 410, "Now on Google Play", 32, 600, MUTED),
        f'<circle cx="928" cy="152" r="78" fill="{BLUE}"/>',
        symbol_white(928, 152, 96),
        img,
        b,
        text(w / 2, 1880, "dottra.co", 30, 700, WHITE, anchor="middle"),
    ]
    return svg(w, h, "\n".join(body))


def cover_linkedin():
    # 1584 x 396. The profile photo covers the bottom-left on personal pages,
    # so content starts at x=420; the phone sits on the right and runs off the bottom.
    w, h = 1584, 396
    phone_h = 640
    phone_x = w - 110 - SCREEN_W * phone_h / SCREEN_H
    img, pw = phone(phone_x, 64, phone_h)
    b, bh = badge(420, 262, 200)
    body = [
        rect(0, 0, w, h, BLUE),
        text(420, 112, ["Credit you can draw, pay back", "and use again."], 42, 800, WHITE, 1.15),
        text(420, 222, "For salaried workers and sponsored students in Zambia.", 22, 500, SOFT),
        b,
        text(420 + 200 + 32, 262 + bh * 0.66, "dottra.co", 26, 700, WHITE),
        img,
    ]
    return svg(w, h, "\n".join(body))


def cover_facebook():
    # 1640 x 624 (2x of 820 x 312). Mobile crops the sides, so content stays
    # between x=200 and x=1460.
    w, h = 1640, 624
    phone_h = 780
    phone_x = 1460 - SCREEN_W * phone_h / SCREEN_H
    img, pw = phone(phone_x, 56, phone_h)
    b, bh = badge(200, 400, 250)
    body = [
        rect(0, 0, w, h, DARK),
        rect(0, h - 16, w, 16, BLUE),
        text(200, 200, ["A credit facility you can", "draw from and use again."], 52, 800, WHITE, 1.15),
        text(200, 342, "For salaried workers and sponsored students in Zambia.", 26, 500, SOFT),
        b,
        text(200 + 250 + 36, 400 + bh * 0.66, "dottra.co", 30, 700, WHITE),
        img,
    ]
    return svg(w, h, "\n".join(body))


def info_frame(title_lines, eyebrow, items, footer_note):
    """1080 x 1350 portrait post (works on Instagram, Facebook and LinkedIn)."""
    w, h = 1080, 1350
    header = 260
    parts = [
        rect(0, 0, w, h, SOFT),
        rect(0, 0, w, header, BLUE),
        wordmark_on_blue(80, 64, 30),
        text(80, 214, eyebrow.upper(), 24, 700, SOFT, spacing=3),
        text(80, header + 112, title_lines, 64, 800, DARK, 1.1),
    ]
    top = header + 112 + (len(title_lines) - 1) * 70 + 48
    note_y = h - 168
    step = min(210, (note_y - 36 - top) / len(items))
    y = top
    for i, (heading, detail) in enumerate(items):
        parts.append(rect(80, y, w - 160, 2, "#c9cddd"))
        parts.append(text(80, y + 56, f"{i + 1:02d}", 28, 800, BLUE))
        parts.append(text(170, y + 56, heading, 36, 800, DARK))
        parts.append(text(170, y + 98, detail, 26, 500, "#454a66", 1.3))
        y += step
    b, bh = badge(80, h - 128, 250)
    parts += [
        text(80, note_y, footer_note, 22, 500, "#5a6078"),
        b,
        text(w - 80, h - 128 + bh * 0.66, "dottra.co", 28, 700, DARK, anchor="end"),
    ]
    return svg(w, h, "\n".join(parts))


def post_how_it_works():
    return info_frame(
        ["How Dottra works."],
        "Launch",
        [
            ("Verify in the app", ["NRC, selfie, and a payslip or", "student documents."]),
            ("Get a credit limit", ["Set after a review of your", "income and affordability."]),
            ("Draw from K10", ["Any amount up to your available", "credit, sent to mobile money."]),
            ("Pay back any time", ["What you repay can be drawn", "again. One statement a month."]),
        ],
        "Limits vary. Not every application is approved.",
    )


def post_costs():
    return info_frame(
        ["What it costs."],
        "Pricing",
        [
            ("5% processing fee", ["Per draw, minimum K1. Draw", "K500 and K475 reaches you."]),
            ("20% monthly charge", ["On your average daily balance.", "Pay back sooner, pay less."]),
            ("No other fees", ["No sign-up, membership,", "early payment or late fees."]),
        ],
        "Full pricing and worked examples at dottra.co/pricing",
    )


def post_who_can_apply():
    return info_frame(
        ["Who can apply."],
        "Eligibility",
        [
            ("Salaried employees", ["Public or private sector,", "with a recent payslip."]),
            ("Sponsored students", ["Government-sponsored, at one", "of 8 supported universities."]),
            ("Everyone needs", ["18+, a valid NRC, and mobile", "money in your own name."]),
        ],
        "Guide limits: up to K3,000 salaried, K400 students.",
    )


DESIGNS = {
    "profile-logo": (profile_logo, 1080, 1080),
    "launch-post": (launch_post, 1080, 1080),
    "launch-story": (launch_story, 1080, 1920),
    "cover-linkedin": (cover_linkedin, 1584, 396),
    "cover-facebook": (cover_facebook, 1640, 624),
    "post-how-it-works": (post_how_it_works, 1080, 1350),
    "post-what-it-costs": (post_costs, 1080, 1350),
    "post-who-can-apply": (post_who_can_apply, 1080, 1350),
}


def main():
    if not shutil.which("inkscape"):
        raise SystemExit("inkscape not found on PATH")
    SVG_OUT.mkdir(parents=True, exist_ok=True)
    for name, (build, w, h) in DESIGNS.items():
        path = SVG_OUT / f"{name}.svg"
        path.write_text(build(), encoding="utf-8")
        png = OUT / f"{name}.png"
        subprocess.run(
            ["inkscape", str(path), "--export-type=png", f"--export-filename={png}",
             f"--export-width={w}", f"--export-height={h}"],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        print(f"built {png.relative_to(ROOT)} ({w}x{h})")


if __name__ == "__main__":
    main()
