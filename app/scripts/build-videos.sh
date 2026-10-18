#!/usr/bin/env bash
# Builds the two launch videos with FFmpeg from the social kit and the
# soundtrack. No generated imagery; every frame is one of the SVG-built posters.
#
# Audio: the supplied track with the first 2.5s removed, capped at 30s, a short
# fade-in so the cut-in isn't abrupt, and a 3s fade-out (cool-down) at the end.
#
# Run: bash scripts/build-videos.sh   (from app/)
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=brand/source
SOCIAL=brand/social
OUT=brand/video
TRACK="$SRC/nveravetyanmusic-afro-summer-282613.mp3"
DARK="#11143a"
mkdir -p "$OUT"
command -v ffmpeg >/dev/null || { echo "ffmpeg not found"; exit 1; }

# 1. Audio: drop first 2.5s, 30s long, fade in 0.6s, fade out 3s.
ffmpeg -y -ss 2.5 -t 30 -i "$TRACK" \
  -af "afade=t=in:st=0:d=0.6,afade=t=out:st=27:d=3" \
  -c:a aac -b:a 192k "$OUT/soundtrack-30s.m4a"

# 2. Video one: the story poster with a slow zoom and an end fade.
ffmpeg -y -loop 1 -framerate 30 -t 30 -i "$SOCIAL/launch-story.png" -i "$OUT/soundtrack-30s.m4a" \
  -filter_complex "[0:v]scale=2160:3840,zoompan=z='min(1.0+0.0009*in,1.08)':d=900:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,fade=t=in:st=0:d=0.8,fade=t=out:st=28.5:d=1.5,format=yuv420p[v]" \
  -map "[v]" -map 1:a -c:v libx264 -preset medium -crf 20 -movflags +faststart -shortest "$OUT/launch-story.mp4"

# 3. Video two: a crossfaded sequence of the launch and info posters.
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
for n in launch-post post-how-it-works post-what-it-costs post-who-can-apply; do
  ffmpeg -y -i "$SOCIAL/$n.png" -vf "pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=$DARK" "$TMP/$n.png"
done

ffmpeg -y \
  -loop 1 -t 7 -i "$TMP/launch-post.png" \
  -loop 1 -t 7 -i "$TMP/post-how-it-works.png" \
  -loop 1 -t 7 -i "$TMP/post-what-it-costs.png" \
  -loop 1 -t 7 -i "$TMP/post-who-can-apply.png" \
  -loop 1 -t 7 -i "$SOCIAL/launch-story.png" \
  -i "$OUT/soundtrack-30s.m4a" \
  -filter_complex "\
[0:v]fps=30,setsar=1[v0];[1:v]fps=30,setsar=1[v1];[2:v]fps=30,setsar=1[v2];[3:v]fps=30,setsar=1[v3];[4:v]fps=30,setsar=1[v4];\
[v0][v1]xfade=transition=fade:duration=0.8:offset=5.84[x1];\
[x1][v2]xfade=transition=fade:duration=0.8:offset=11.68[x2];\
[x2][v3]xfade=transition=fade:duration=0.8:offset=17.52[x3];\
[x3][v4]xfade=transition=fade:duration=0.8:offset=23.36[x4];\
[x4]fade=t=in:st=0:d=0.8,fade=t=out:st=28.5:d=1.5,format=yuv420p[v]" \
  -map "[v]" -map 5:a -c:v libx264 -preset medium -crf 20 -movflags +faststart -t 30 "$OUT/launch-sequence.mp4"

echo "built $OUT/launch-story.mp4 and $OUT/launch-sequence.mp4 (30s each, 1080x1920)"
