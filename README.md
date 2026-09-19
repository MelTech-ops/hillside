# Hillside Neighborhood Cafe & Pub — Website

Static site for **Hillside Neighborhood Cafe and Pub**, 20 N Spring St, Ansonia, CT 06401.
No build step, no framework, no dependencies. Plain HTML, CSS and vanilla JS — open
`index.html` in a browser and it works.

---

## Pages

| File | What's on it |
|---|---|
| `index.html` | Home — hero, hours/location strip, this week's specials, menu teaser, socials, catering CTA |
| `neighborhood.html` | The story, what they're known for, and the auto-updating Facebook feed |
| `menu.html` | Full menu, built from `assets/js/menu-data.js`, with category filters |
| `events.html` | Weekly recurring specials + a section for one-off events |
| `contact.html` | Hours table, Google map, and the catering inquiry form |
| `404.html` | Not-found page |

---

## Push it to GitHub

```bash
cd hillside-cafe-pub
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Turn on GitHub Pages

1. Repo → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, folder `/ (root)` → **Save**
4. Live in a minute or two at `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### Adding a custom domain later

1. Create a file called `CNAME` in the repo root containing just the domain, e.g.
   `hillsidecafeandpub.com` (no `https://`, no trailing slash).
2. At the domain registrar, add these DNS records:
   - Four `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` → `YOUR-USERNAME.github.io`
3. Repo → Settings → Pages → enter the domain → tick **Enforce HTTPS** once the
   certificate provisions (can take up to 24h).
4. Update the domain in `robots.txt`, `sitemap.xml`, and the `og:image` / canonical
   tags in `index.html`.

`.nojekyll` is already included so GitHub Pages serves the files as-is.

---

## Editing the site

### The menu
Edit **`assets/js/menu-data.js`** — that's the only file. It's a plain list:

```js
{
  id:   "hoags",
  name: "Smoked & Hoags",
  note: "Optional italic line under the heading",
  items: [
    { name: "Goose's Smoked Brisket", desc: "Served with sweet fries.", price: "17.75", tag: "Popular" }
  ]
}
```

- `price` is just the number as text. Leave it `""` to show **MKT**.
- `desc` and `tag` are optional — delete the line if you don't want one.
- Add or remove whole categories by copying/deleting a `{ ... }` block.
- The filter chips at the top of the menu page build themselves from this list.

### Hours
Edit the `HOURS` array near the top of **`assets/js/main.js`**. The "Open now" badge
on the home page and the hours table on the contact page both read from it.
`close: 25` means 1:00 AM the next day.

### Events
Weekly specials are hand-written rows in `events.html` (search for `week__row`).
One-off events are `<article class="card">` blocks near the bottom — copy one to add,
delete one to remove.

### Colors and fonts
All design tokens live at the top of **`assets/css/style.css`** under `:root`.

The palette is sampled straight off the badge logo file:

| Token | Value | Where it comes from |
|---|---|---|
| `--cream` | `#0E1A0B` | page ground (the site is dark throughout) |
| `--forest` | `#16260F` | raised surfaces: cards, forms, rows |
| `--forest-deep` | `#0A1207` | deepest ground |
| `--sun` | `#D4A82A` | antique gold, used as a thin accent only |
| `--ink` | `#EBE7D6` | headings |
| `--ink-soft` | `#BFC7B2` | body copy |
| `--brand-green` | `#3C6432` | the logo green, sampled from the badge file |

The logo's own vivid yellow (`#FAC800`) stays inside the logo. On the page it's
muted to `--sun` so it reads as an accent rather than a field of color.

The type system mirrors the three faces on the badge:

| Token | Font | Used for |
|---|---|---|
| `--wood` | Rye | big display headings — the western wood type of "HILLSIDE" |
| `--caps` | Oswald | letterpress caps: eyebrows, nav, buttons, labels, menu items |
| `--script` | Yellowtail | the brush-script accents, like "Cafe & Pub" |
| `--body` | Bitter | body copy — a slab serif that sits with the wood type |

Change a token and the whole site follows. Rye is deliberately used at large
sizes only; it's a display face and gets hard to read small.

---

## The Facebook feed

The Neighborhood page shows recent Facebook posts, and it works two ways.

**Out of the box** it embeds Facebook's own Page Plugin — the live timeline, no
setup at all. It only renders on a real domain, so it looks blank if you open
the file from your desktop.

**Better:** switch on `.github/workflows/facebook-feed.yml`. That job calls the
Graph API every 6 hours, writes the posts to `assets/data/facebook-posts.json`,
and commits it. The page then renders its own fast, on-brand post grid and hides
the embed automatically. Setup is two repo secrets:

| Secret | Value |
|---|---|
| `FB_PAGE_TOKEN` | a long-lived **Page** access token |
| `FB_PAGE_ID` | `100072511775450` |

Full step-by-step for getting that token is in the comments at the top of the
workflow file. You also need Settings → Actions → General → Workflow permissions
set to **Read and write** so the job can commit.

If the secrets aren't set, the job exits quietly and the embed keeps showing.
Nothing breaks.

---

## Turning on the catering form

The form is wired to **Formspree**, which works on GitHub Pages (no server needed).

1. Sign up at [formspree.io](https://formspree.io) — the free tier covers 50
   submissions/month.
2. Create a new form. You'll get an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `contact.html`, find:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" data-ajax-form novalidate>
   ```
   Replace `YOUR_FORM_ID` with the real ID.
4. Set the notification email inside Formspree.
5. Commit and push.

Until that's done, the form shows a clear "not connected yet" message instead of
silently failing. A honeypot field is already in place for spam.

---

## Before launch — checklist

- [ ] **Confirm the phone number.** The site uses **(203) 751-9285**, which is what's
      on both their Facebook page and their Toast site.
- [ ] **Confirm kitchen vs. bar hours.** The site shows the bar open Mon–Thu 12pm–12am,
      Fri–Sat 12pm–1am, Sun 9am–12am (from Facebook) and the kitchen closing at 10pm
      (from the Toast menu and the specials flyers). Verify both.
- [ ] **Verify menu prices** in `assets/js/menu-data.js` — pulled from their Toast
      ordering menu on 2026-09-19 and they may have moved since.
- [ ] **Add real photos.** Every photo well is still an empty labelled placeholder.
      `assets/img/README.txt` is the full shot list with sizes. Their Facebook and
      Instagram albums are the obvious source. This is the one thing still holding
      the design back.
- [x] ~~Add the real logo~~ — done. The badge is in every header, background removed,
      plus favicon and Apple touch icon. Swap in vector artwork later if you get it.
- [ ] Add a business email address if they want one on the contact page.
- [ ] Set up the Formspree endpoint.
- [ ] Update `robots.txt`, `sitemap.xml` and the canonical URL in `index.html` with the
      real domain.

---

## Content sources

Everything on the site came from:

- Their Facebook page — bio, hours, address, phone, specials flyers
- Their Toast ordering site — menu items, prices and the real dish descriptions
- Their Toast-hosted marketing page — Taco Tuesday, Steak Night, Sunday Brunch,
  Happy Hour, "your home away from home"

The site deliberately has **no online ordering**, per the brief.
