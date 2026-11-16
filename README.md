# GTA VI Countdown: US PS5

A single-page, fan-made countdown to GTA VI unlocking on US PlayStation Store accounts:
**Thu, Nov 19, 2026 · 12:00 AM ET** (05:00 UTC, so 9:00 PM PT on Nov 18).

- Live countdown with the unlock time in every US time zone, plus the viewer's local time
- Original synthwave soundtrack, generated live with the Web Audio API (no audio files, no copyrighted music)
- Original sunset artwork drawn in SVG (no copyrighted images)
- Add-to-calendar (.ics), share button, "OUT NOW" state with confetti at zero

It's a single static file (`index.html`) with no build step.

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this repo.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy. Every push to `main` redeploys automatically.

## Stream it on YouTube Live (OBS)

Add `?stream` to the URL for a clean broadcast view. It hides the buttons and the cursor and starts the music automatically.

| URL | Effect |
| --- | --- |
| `https://your-site.vercel.app/?stream` | Stream view with music |
| `https://your-site.vercel.app/?stream&vol=0.5` | Stream view at 50% volume |
| `https://your-site.vercel.app/?stream&mute` | Stream view, silent (use your own audio in OBS) |

OBS setup:

1. **Sources → + → Browser**, paste the `?stream` URL, set **Width 1920 / Height 1080**.
2. Tick **Control audio via OBS** so the soundtrack shows up in the OBS mixer.
3. **Settings → Stream**: choose YouTube, connect your account (or paste the stream key from YouTube Studio → Go Live).
4. Start streaming.

## Custom background photo

Put a royalty-free image (e.g. from Unsplash or Pexels) next to `index.html` as **`bg.jpg`**. The page uses it instead of the drawn scene automatically.

## Changing the date

Edit `UNLOCK` at the top of the `<script>` in `index.html` (it's in UTC).

---

Fan-made. Not affiliated with Rockstar Games, Take-Two Interactive or Sony Interactive Entertainment.
