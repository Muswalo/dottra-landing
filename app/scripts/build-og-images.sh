#!/usr/bin/env bash
# Builds the 1200x630 Open Graph images with the Inkscape CLI.
# Flat brand colours only. Source SVGs go to scripts/og-src/, PNGs to public/og/.
#
# Run: bash scripts/build-og-images.sh
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=scripts/og-src
OUT=public/og
mkdir -p "$SRC" "$OUT"

command -v inkscape >/dev/null || { echo "inkscape not found"; exit 1; }

# The real brand mark, embedded so the SVG is self-contained.
SYMBOL_B64=$(base64 -w0 public/dottra-symbol-light.png)
# Official Google Play badge, embedded as-is (never redrawn). 646x250, visible area 564x168 at (41,41).
BADGE_B64=$(base64 -w0 public/google-play-badge.png)

BLUE='#464bd6'
DARK='#11143a'
SOFT='#f0f1ff'
FONT="Inter, 'Liberation Sans', Arial, sans-serif"

# name|eyebrow|line1|line2|footer
PAGES=(
  "home|Dottra|A credit facility you can|draw from and use again.|Salaried workers and sponsored students in Zambia"
  "product|Product|One credit limit you can|use more than once.|Draw to mobile money, pay back any time"
  "how-it-works|How it works|From sign-up to your|first statement.|Setup takes minutes. Draws take seconds."
  "pricing|Pricing|5% per draw. 20% a month|on what you used.|No sign-up fees. No late fees."
  "eligibility|Eligibility|Who can apply|for Dottra.|Salaried employees and sponsored students"
  "about|About|Credit for income that|arrives once a month.|Dottra Lending Services Limited, Lusaka"
  "support|Help|Answers to the questions|people ask most.|support@dottra.co"
  "contact|Contact|Get in touch|with Dottra.|hello@dottra.co   support@dottra.co"
  "blog|Blog|Practical guides on|money in Zambia.|Budgeting, mobile money, students, salaries"
  "legal|Legal|Terms, privacy|and policies.|dottra.co"
)

esc() { sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' <<<"$1"; }

for entry in "${PAGES[@]}"; do
  IFS='|' read -r name eyebrow line1 line2 footer <<<"$entry"
  svg="$SRC/$name.svg"
  cat >"$svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="$BLUE"/>
  <rect x="0" y="560" width="1200" height="70" fill="$DARK"/>
  <rect x="72" y="66" width="104" height="104" rx="22" fill="#ffffff"/>
  <image x="88" y="96" width="72" height="51" xlink:href="data:image/png;base64,$SYMBOL_B64"/>
  <text x="204" y="112" font-family="$FONT" font-size="40" font-weight="700" fill="#ffffff">Dottra</text>
  <text x="204" y="152" font-family="$FONT" font-size="24" font-weight="600" fill="$SOFT" fill-opacity="0.85">dottra.co</text>
  <text x="76" y="262" font-family="$FONT" font-size="26" font-weight="700" letter-spacing="3" fill="$SOFT" fill-opacity="0.85">$(esc "${eyebrow^^}")</text>
  <text x="72" y="350" font-family="$FONT" font-size="66" font-weight="700" fill="#ffffff">$(esc "$line1")</text>
  <text x="72" y="432" font-family="$FONT" font-size="66" font-weight="700" fill="#ffffff">$(esc "$line2")</text>
  <text x="76" y="604" font-family="$FONT" font-size="26" font-weight="600" fill="#ffffff">$(esc "$footer")</text>
  <image x="$((1128 - 280))" y="76" width="321" height="124" transform="translate(-20.4 -20.4)" xlink:href="data:image/png;base64,$BADGE_B64"/>
</svg>
SVG
  inkscape "$svg" --export-type=png --export-filename="$OUT/$name.png" --export-width=1200 --export-height=630 >/dev/null 2>&1
  echo "built $OUT/$name.png"
done

# The previous site published /og-image.png; keep that URL pointing at the home image.
cp "$OUT/home.png" public/og-image.png
echo "copied home image to public/og-image.png"
