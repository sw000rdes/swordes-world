# swordes.world

Personal website for the musician **Swordes**, built to look like a late-90s Geocities page.
Plain HTML, CSS and a little JavaScript only — no frameworks, no build step.
The owner is not a coder: explain things in plain language and give step-by-step instructions.

## Pages

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Welcome box, announcement (links to Tour Dates), fav pic, email sign-up, music player (Webamp), social links, "Enter" button (links to Videos) |
| Videos | `videos.html` | Announcement, 3 YouTube embeds (order from `links.txt`), "Gate Of Knowledge" button (Libertalia on Wikipedia), decorative GIFs |
| Tour Dates | `tour-dates.html` | "Swordes Tour 2026" ticket buttons + "notify me" email sign-up |

**Email sign-ups:** both forms ("I'm Ready" on Home, "Notify Me <3" on Tour Dates) are plain HTML forms that post to the owner's **Buttondown** newsletter (`https://buttondown.com/api/emails/embed-subscribe/swordes`, field `name="email"`). Visitors land on Buttondown's own page afterwards. No JavaScript, and they keep the site's styling, not Buttondown's.
| Music | `music.html` | "To listen is to understand." + buttons to streaming services |
| Contact | `contact.html` | Booking emails (Europe / rest of world) + all other inquiries |

## How the files are organized

- `index.html`, `videos.html`, `tour-dates.html`, `music.html`, `contact.html` — the five pages.
- `style.css` — all styling for every page, with a phone section (`@media (max-width: 740px)`) at the end.
- `script.js` — shared JavaScript:
  - Builds the top bar and the **Treasure Map** dropdown on every page from `MENU_LINKS`. Edit the menu there, not in the HTML.
  - `MERCH_STORE_URL`: empty for now, so Merchandise buttons show a "Merch coming soon!" popup. Once it's filled in, every `href="#merch"` link goes to the store.
- `player.js` — the home page music player ("Listen to my music!"). Only `index.html` loads it.
  - Big screens get **Webamp 2.3.1** (the Butterchurn bundle, so the Milkdrop visualizer shows like in the mockup), loaded from jsDelivr. The windows are laid out to fill the 464px-tall `.webamp-box`: main, equalizer and playlist stacked on the left, Milkdrop on the right.
  - Phones (narrow screens or touch screens) get a simple player instead: one `<audio>` bar plus a clickable song list that moves on to the next song automatically. It's also the fallback if Webamp fails to load.
  - Songs are listed in `SONGS` and skins in `SKINS`. A static site can't scan folders, so **a new .mp3 or .wsz must be copied into `audio/` or `skins/` AND added to these lists.**
  - `DEFAULT_SKIN` is the **Pirate** skin. Visitors switch skins with right-click → Skins.
  - Webamp normally starts downloading the first song (~3.7 MB) as soon as the page loads. `player.js` stops this by setting `preload="none"` on the audio element Webamp creates during `new Webamp(...)`, so songs only download when someone presses Play. Keep this when upgrading Webamp. (Using `appendTracks` instead of `initialTracks` also stops the download, but it breaks the Play button.)
- `images/` — **web-sized copies** that the site actually uses. The background is 1920px wide (~260 KB) and the fav pic is 1000px wide (~235 KB).
- `audio/` — copies of the MP3s from `assets/mp3s/` (320 kbps; titles come from the songs' own tags).
- `skins/` — copies of the Winamp skins from `assets/winamp skins/`.
- To publish, upload the HTML, CSS and JS plus `images/`, `audio/` and `skins/`. The `assets/` folder doesn't need to go up.
- `assets/` — the owner's **originals. Never modify, move or delete them.** To use a new asset, make a web-sized copy in `images/`.
  - `assets/mockup/swordes.world mockup.pdf` — the original 5-page design mockup.
- `links.txt` — the owner's list of every link and email address. It's the source of truth: when it and the mockup disagree, follow `links.txt`.
- `.claude/launch.json` — preview server config (`python3 -m http.server 8000`).

## Design preferences

- **Look:** late-90s / early-2000s web. Gray beveled "windows" with gradient title bars and XP-style icons, beveled gray buttons with blue italic Times text, animated GIFs, a pirate / mystical / ocean theme.
- **Font:** Times New Roman everywhere.
- **Background:** use the **teal** ocean (`images/ocean-bg.jpg`, made from `swordes-world_oceanbg-teal.jpg`), **not** the plain blue one. It must be **one stationary picture** that fills the screen while the page scrolls over it. Never tile or stack it like the mockup. It's done with a fixed `body::before`, so it also stays put on iPhones.
- **Logo:** use the **black-and-white** logo (`swordes-logo-bw.png` → `images/swordes-logo.png`). **Do not use the pink/plum logo**, even though the mockup shows it. It is centered and links back to the home page (`<a class="logo" href="index.html">`) on Home, Tour Dates, Music and Contact. Videos has no logo, like the mockup.
- **Icons:** the "Find me online" box uses the info icon (there's no laptop icon). XP icon copies are trimmed of empty padding so they read clearly at title-bar size.
- **Pirate heads** (home page top corners): one spin takes exactly **2 seconds**. That's set by the frame timings in the `images/piraten007.gif` copy (16 frames alternating 0.13 s / 0.12 s).
- Must work on phones: no sideways scrolling, and boxes stack on narrow screens.
- Otherwise, match the mockup as closely as possible.

## On hold — wait for the owner's instructions

- **Merch store:** no link yet (see `MERCH_STORE_URL`).
- **Unused assets the owner may still use:** `pirate-flag.gif`, the blue ocean background, the pink/plum logo.

## Publishing (GitHub Pages)

- Live site: **https://sw000rdes.github.io/swordes-world/**
- Repository (public): **https://github.com/sw000rdes/swordes-world**, branch `main`. Pages serves the repository root.
- `.gitignore` keeps `assets/` (the originals, including the mockup), `.claude/` and `.DS_Store` off GitHub. Only the site files go up.
- Commits use the name `sw000rdes` with GitHub's noreply email (set in this repo's local git config), so the owner's personal email stays private.
- To update the live site: commit the changes, then `git push`. GitHub rebuilds the site in about a minute.
- Pushing needs the GitHub CLI (`gh`), logged in as sw000rdes. It isn't installed on this Mac. For the first publish it was downloaded into a temporary session folder that may be gone later, but the login is saved in the macOS keychain. This repo's git config points its credential helper at that temporary `gh` path, so if a push fails to authenticate, download `gh` again and re-point the helper.
- `http.postBuffer` is raised in this repo's git config so large MP3 uploads don't fail.

## Preview

```bash
cd ~/Desktop/swordes-world && python3 -m http.server 8000
```

Then open http://localhost:8000. YouTube videos won't play when a page is opened by double-clicking the file, so preview through the server.
