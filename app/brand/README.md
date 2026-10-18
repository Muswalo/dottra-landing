# Dottra launch social kit

Everything here is assembled from real assets with SVG and exported with the
Inkscape CLI: the app screenshot, the Dottra symbol, and the official Google
Play badge (embedded as an image, never redrawn). Flat brand colours, no
gradients, no generated imagery.

Rebuild after any change: `bun run images:social` (from `app/`).
Edit by hand: open any file in `social/svg/` in Inkscape.

## Files and where they go

| File | Size | Use it for |
| --- | --- | --- |
| `social/profile-logo.png` | 1080 × 1080 | Profile picture on LinkedIn, Facebook and Instagram. The symbol is centred, so it survives the circular crop. |
| `social/cover-linkedin.png` | 1584 × 396 | LinkedIn company page banner. Content starts right of the profile-photo area. |
| `social/cover-facebook.png` | 1640 × 624 | Facebook page cover (uploads at 2× of 820 × 312). Content stays inside the mobile-safe centre. |
| `social/launch-post.png` | 1080 × 1080 | The launch announcement. Square works on all three platforms. |
| `social/launch-story.png` | 1080 × 1920 | Launch announcement for Instagram and Facebook Stories / WhatsApp Status. Based on the Inkscape template in `source/`. |
| `social/post-how-it-works.png` | 1080 × 1350 | Follow-up post 1: the four steps. |
| `social/post-what-it-costs.png` | 1080 × 1350 | Follow-up post 2: the two charges. |
| `social/post-who-can-apply.png` | 1080 × 1350 | Follow-up post 3: eligibility. |

Instagram has no cover image; use the profile logo and pin the launch post.

## Suggested order

1. Day 1: launch post (feed) and launch story.
2. Day 2 or 3: how it works.
3. Day 4 or 5: what it costs.
4. Day 6 or 7: who can apply.

## Captions

Plain text you can paste. Link to `https://dottra.co` in the bio or first comment
where the platform doesn't allow links in posts.

**Launch post**

> Dottra is now on Google Play.
>
> It's a credit facility for salaried workers and government-sponsored students in Zambia. Once your limit is set, you can draw any amount from K10 to your mobile money, pay back on any day, and draw again. You get one statement a month.
>
> Pricing is published in full at dottra.co/pricing.
>
> Limits are set after identity checks and an affordability review.

**How it works**

> How Dottra works:
> 1. Verify in the app with your NRC, a selfie, and a payslip or student documents.
> 2. Get a credit limit after we review your income and affordability.
> 3. Draw from K10 up to your available credit, sent to mobile money.
> 4. Pay back any time. What you repay can be drawn again.
>
> dottra.co/how-it-works

**What it costs**

> Two charges:
> - 5% processing fee per draw, minimum K1. Draw K500 and K475 reaches your wallet.
> - 20% monthly charge on your average daily balance. Pay back sooner and it's smaller.
>
> No sign-up, membership or late fees. Worked examples at dottra.co/pricing

**Who can apply**

> Dottra is open to:
> - salaried employees in the public or private sector, with a recent payslip;
> - government-sponsored students at Chalimbana, Copperbelt, Kapasa Makasa, Kwame Nkrumah, Levy Mwanawasa Medical, Mukuba, Mulungushi and UNZA.
>
> You need to be 18 or older, with a valid NRC and a mobile money wallet in your own name.
>
> dottra.co/eligibility

## Videos

Built with FFmpeg from the posters above (`bun run videos`, or
`bash scripts/build-videos.sh`). Both are 1080 × 1920, 30 seconds, H.264 + AAC.

| File | What it is |
| --- | --- |
| `video/launch-story.mp4` | The story poster with a slow zoom and an end fade. For Stories / WhatsApp Status / Reels. |
| `video/launch-sequence.mp4` | A crossfaded run through the launch, how-it-works, pricing and eligibility posters, ending back on the CTA. |
| `video/soundtrack-30s.m4a` | The trimmed audio both videos use. |

The soundtrack (`source/nveravetyanmusic-afro-summer-282613.mp3`) is trimmed with
the first 2.5 seconds removed, capped at 30 seconds, with a short fade-in and a
3-second fade-out at the end so the music eases out instead of cutting off.

## Source files
- `source/dottra-screenshot.png`: app home screen in a phone frame (used in every design).
- `source/dottra-symbol-white.png`: white symbol, extracted from the template.
- `source/dottra-promo-template.svg`: the original Inkscape story template. It shows the retired package screens, so it is kept for layout reference only.
