# Sanatan Prakashan Mandir — website

A static, vintage-styled website for **Sanatan Prakashan Mandir** (publishing
division of Sri Ballabh Press, Hathras — est. 1983), ready to host for free on
GitHub Pages.

## Pages

| File | Menu item | Purpose |
|------|-----------|---------|
| `index.html` | Home | Story of the press (the 1983 history) |
| `publications.html` | Publications | Book/booklet cards linking to readable PDFs |
| `archive.html` | Digital Archive | Photographs, newspaper cuttings & 1983 documents |
| `foundation.html` | Chetanya Foundation | About the foundation carrying the legacy forward |

## Adding your own content

- **PDFs** → drop files into `assets/pdfs/` and make sure each filename matches
  the `href` in the matching card in `publications.html`
  (e.g. `assets/pdfs/ganesh-chalisa.pdf`).
- **Archive images** → drop scans into `assets/archive/` and update the
  `src` / `alt` / `data-caption` of each `<figure>` in `archive.html`.
- **Hero background (optional)** → add `assets/img/hero.jpg`; it sits behind the
  green wash on the home page.

Missing images automatically show a labelled "coming soon" placeholder, so the
layout never breaks while you gather material.

## Publish on GitHub Pages

This repo is named for a **user/organization site**, so it goes live at the root
domain.

1. Create a GitHub account/organization named **`sanatanprakashan`**.
2. Create a repository named exactly **`sanatanprakashan.github.io`**.
3. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/sanatanprakashan/sanatanprakashan.github.io.git
   git push -u origin main
   ```
4. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`. Save.
5. After a minute the site is live at **https://sanatanprakashan.github.io**.

## Local preview

```bash
cd sanatanprakashan.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

## Tech

Plain HTML + CSS + a little vanilla JavaScript. No build step. Vintage look uses
the Playfair Display + EB Garamond typefaces, an aged-paper texture, a
hand-built SVG crest (`assets/img/seal.svg`), and sepia-toned imagery.
