<div align="center">

<img src="docs/preview-desktop.png" alt="GTA VI countdown: synthwave sunset over a city skyline with a live countdown to the US PS5 unlock" width="100%">

<br>

# 🌴 GTA VI Countdown · US PS5

**A fan-made, single-page countdown to the moment GTA VI unlocks on US PlayStation 5 accounts.**<br>
Sunset skyline, original synthwave soundtrack, and a broadcast-ready stream mode for YouTube Live.

<br>

![Unlock](https://img.shields.io/badge/unlocks-Nov_19,_2026_·_12:00_AM_ET-ff3ea5?style=for-the-badge)
![Platform](https://img.shields.io/badge/PS5-US_PlayStation_Store-0070d1?style=for-the-badge&logo=playstation&logoColor=white)

![HTML5](https://img.shields.io/badge/HTML5-single_file-e34f26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-no_dependencies-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Web Audio](https://img.shields.io/badge/Web_Audio-generated_soundtrack-7b2cff?style=flat-square)
![Build](https://img.shields.io/badge/build_step-none-3ee0ff?style=flat-square)

<br>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/risindu-dev/gta6-countdown)

[**Features**](#-features) · [**Unlock times**](#-unlock-times) · [**Deploy**](#-deploy-on-vercel) · [**Go live on YouTube**](#-go-live-on-youtube) · [**Customize**](#-customize)

</div>

<br>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### ⏱️ Live countdown
Days, hours, minutes and seconds on frosted-glass cards with a flip animation. The browser tab title counts down too.

</td>
<td width="50%" valign="top">

### 🇺🇸 Every US time zone
Unlock time shown for ET, CT, MT, PT, Alaska and Hawaii, plus the visitor's own local time, wherever they are.

</td>
</tr>
<tr>
<td valign="top">

### 🎵 Original soundtrack
A synthwave loop generated live in the browser with the Web Audio API. No audio files, no copyrighted music, so it's safe for streams.

</td>
<td valign="top">

### 🌅 Hand-built artwork
Sunset, skyline, ocean reflections and swaying palm trees, all drawn in SVG. The sun pulses with the bass.

</td>
</tr>
<tr>
<td valign="top">

### 🔴 Stream mode
Add `?stream` for a clean broadcast view: no buttons, no cursor, music starts automatically. Built for OBS browser sources.

</td>
<td valign="top">

### 🎉 Launch moment
At zero the page switches to **OUT NOW** with a confetti burst. Leave the stream running through launch.

</td>
</tr>
<tr>
<td valign="top">

### 📅 Add to calendar
One click downloads an `.ics` event with a 30-minute reminder. Works with Google, Apple and Outlook calendars.

</td>
<td valign="top">

### 📱 Works everywhere
Responsive from phones to 4K, respects reduced-motion settings, and loads as a single ~40 KB HTML file.

</td>
</tr>
</table>

<br>

<div align="center">
<img src="docs/preview-mobile.png" alt="Mobile view of the countdown" width="300">
<br>
<sub>Mobile view</sub>
</div>

<br>

## 🕛 Unlock times

GTA VI unlocks on the US PlayStation Store at **05:00 UTC on Thursday, November 19, 2026**. That's a single nationwide moment, so the West Coast can start playing the night before.

| Time zone | Unlock |
| :-- | :-- |
| 🗽 **Eastern** (ET) | Thu, Nov 19 · **12:00 AM** |
| 🌾 **Central** (CT) | Wed, Nov 18 · **11:00 PM** |
| 🏔️ **Mountain** (MT) | Wed, Nov 18 · **10:00 PM** |
| 🌉 **Pacific** (PT) | Wed, Nov 18 · **9:00 PM** |
| ❄️ **Alaska** (AKT) | Wed, Nov 18 · **8:00 PM** |
| 🌺 **Hawaii** (HT) | Wed, Nov 18 · **7:00 PM** |

> [!NOTE]
> These times come from the US PlayStation Store listing. Rockstar hasn't published an official US time-zone breakdown, so check the store on launch day.

<br>

## 🚀 Run it locally

There's nothing to install. Open `index.html` in any modern browser, or serve the folder:

```bash
npx serve .
```

<br>

## ▲ Deploy on Vercel

**One click:** use the **Deploy with Vercel** button at the top of this page.

**Or manually:**

1. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Hit **Deploy**. Every push to `main` redeploys automatically.

<br>

## 🔴 Go live on YouTube

Vercel hosts the page; OBS on your machine renders it and streams it to YouTube.

```mermaid
flowchart LR
    A["▲ Vercel<br/>your-site.vercel.app/?stream"] --> B["🎥 OBS<br/>Browser Source 1920×1080"]
    B --> C["🔴 YouTube Live"]
```

### Stream URLs

| URL | What you get |
| :-- | :-- |
| `/?stream` | Clean broadcast view with music |
| `/?stream&vol=0.5` | Same, at 50% volume (`0` – `1`) |
| `/?stream&mute` | Silent. Bring your own audio in OBS |

Stream mode also hides the "your local time" line, so viewers don't see the streaming computer's time zone.

### OBS setup

1. **Sources → ＋ → Browser**, paste `https://<your-site>.vercel.app/?stream`
2. Set **Width `1920`** and **Height `1080`**
3. Tick **Control audio via OBS** so the soundtrack shows up in the mixer
4. **Settings → Stream** → choose **YouTube** and connect your account (or paste the key from YouTube Studio → Go Live)
5. **Start Streaming** 🎬

> [!TIP]
> If the music doesn't start in OBS, right-click the source → **Interact** and click once on the page.

> [!IMPORTANT]
> The stream only runs while OBS is running. For a multi-day countdown, keep the machine awake (disable sleep), or run OBS on a cloud VM. YouTube keeps only the last 12 hours of streams longer than that as a replay; the live broadcast itself is unaffected.

<br>

## 🎨 Customize

| What | How |
| :-- | :-- |
| **Background photo** | Drop a royalty-free image (e.g. from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com)) next to `index.html` as **`bg.jpg`**. It replaces the drawn scene automatically. |
| **Unlock date** | Edit `UNLOCK` at the top of the `<script>` in `index.html` (UTC). |
| **Time zones** | Edit the `ZONES` list right below it. |
| **Colors** | Tweak the CSS variables in `:root` (`--pink`, `--orange`, `--cyan`, …). |
| **Keyboard** | Press <kbd>M</kbd> to toggle the music. Click the **VI** logo for confetti. |

<br>

## 🎵 About the soundtrack

The music is composed in code and synthesized live by your browser: an **Am → F → C → G** progression at 98 BPM, arranged as a 16-bar cycle (about 40 seconds) that keeps evolving.

| Bars | What plays |
| :-: | :-- |
| 1–2 | Warm detuned pad and a sustained bass |
| 3–4 | Arpeggio fades in with tempo-synced delay |
| 5–8 | Full groove: four-on-the-floor kick, snare, hats, pumping bassline |
| 9–16 | Lead melody with vibrato, ending in a snare roll back to the top |

All voices are oscillators and filtered noise, with no samples, so there's nothing for YouTube Content ID to match.

<br>

## 🗂️ Project structure

```
gta6-countdown/
├── index.html      ← the whole site: markup, styles, artwork, music, logic
├── README.md
└── docs/           ← screenshots for this README
```

<br>

---

<div align="center">
<sub>
Fan-made project. Not affiliated with, endorsed or sponsored by Rockstar Games, Take-Two Interactive or Sony Interactive Entertainment.<br>
<i>Grand Theft Auto</i> and <i>PlayStation</i> are trademarks of their respective owners. All artwork and music in this repo are original.
</sub>
<br><br>
Made with 🌅 for Leonida
</div>
