# Corsa Notturna website

A one-page site for Corsa Notturna sim racing dashboards. It's plain HTML, so GitHub Pages can host it for free.

## What's in this folder

| File or folder | What it's for |
|---|---|
| `index.html` | The page itself |
| `config.js` | **Your settings: the only file you need to edit** |
| `styles.css`, `site.js` | Look and behaviour (no need to touch) |
| `img/` | Logo and icons. Dashboard screenshots go in `img/dashes/` |
| `downloads/` | Your `.mzdash` files go here when you're ready to share them |
| `fonts/` | Fira Sans, with its free licence (`OFL.txt`) |

## Put it on GitHub

1. Sign in at github.com and click **New repository**. Name it `corsanotturna` (or anything you like), set it to **Public**, and click **Create repository**.
2. On the new repository's page, click **uploading an existing file**. Drag in **everything inside this folder** (not the folder itself), and click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose **main** and **/ (root)**, and click **Save**.
4. After a minute or two, the site is live at `https://YOUR-USERNAME.github.io/corsanotturna/`.

## Connect your domain

Do these in this order. GitHub warns that setting up the DNS before adding the domain on GitHub can let someone else take over your domain.

1. In **Settings → Pages → Custom domain**, type your domain (for example `corsanotturna.com`) and click **Save**.
2. At the company you bought the domain from, open the domain's **DNS** settings and add:
   - Four **A** records for `@` pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
   - Remove any old A records or "parking" records for `@` that point somewhere else.
3. Wait. DNS changes can take up to 24 hours, though it's often much quicker.
4. Back in **Settings → Pages**, tick **Enforce HTTPS** once GitHub lets you.

## Change your settings

On GitHub, open `config.js`, click the pencil icon, change what you need, and click **Commit changes**. The site updates by itself in a minute or two.

- `kofi`: paste your Ko-fi link and the Ko-fi buttons and the "Support the project" section appear.
- `email`: shows a contact link in the footer.
- `social`: your YouTube, TikTok, Instagram and Discord links. They show up under the "coming soon" message.

Anything left as `""` stays hidden.

## Add a dashboard later

1. Upload the screenshots to `img/dashes/` and the `.mzdash` file to `downloads/` (on GitHub: open the folder, then **Add file → Upload files**).
2. In `config.js`, paste an entry like this between the `[` and `]` of `dashes`, and change the details:

```js
{
  name: "Corsa Notturna GT",
  device: "MOZA CM2 dash, 1280×720",
  description: "A full race dash with everything you need for a stint, plus a qualifying page with a live lap progress bar.",
  features: [
    "Rev lights, gear and speed",
    "Lap time, predicted lap and delta",
    "Fuel per lap and laps of fuel left",
    "Flags and pit limiter warnings"
  ],
  pages: [
    { label: "Race", image: "img/dashes/gt_race.png" },
    { label: "Qualifying", image: "img/dashes/gt_quali.png" }
  ],
  download: "downloads/corsa-notturna-gt.mzdash",
  version: "1.0",
  updated: "November 2026"
},
```

Put a comma between entries if you add more than one. As soon as the list has at least one dashboard, the "coming soon" message is replaced by your dashboards and the "How to install" steps appear.
