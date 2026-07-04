# SORRY. 🍁

*Unapologetically Canadian apparel.*

A modern, one-page e-commerce site for **SORRY.** — an unapologetically Canadian apparel
label. Four heavyweight staples (hoodie, tee, cap, jacket). Built as a **static site**
(HTML/CSS/JS) so it runs for free on **GitHub Pages**, with **secure Stripe checkout**
via Stripe Payment Links.

**Brand:** Canadian, hipster, unapologetic. The name plays on the Canadian reflex to
apologize — flipped into "sorry, not sorry." Palette is warm cream + near-black ink +
Canada red; type pairs the editorial serif **Fraunces** with the grotesque **Space Grotesk**.
Logos live in `assets/` (`logo.svg`, `logo-mark.svg`, `favicon.svg`).

> No backend required. No frameworks. Just edit one config file and deploy.

---

## 📁 Project structure

```
.
├── index.html          # The one-page site
├── css/styles.css      # Styling (Canadian red/white theme)
├── js/
│   ├── config.js       # 👈 EDIT THIS — your Stripe links & prices live here
│   └── main.js         # Cart + checkout logic
├── assets/             # Product artwork (SVG)
└── README.md
```

---

## 🛒 Step 1 — Connect Stripe (5 minutes)

Because GitHub Pages only serves static files (no server), we use **Stripe Payment
Links** — Stripe's official, hosted checkout that works perfectly on static sites.

For **each** of the 4 products:

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/) → **Product catalog** → **Add product**.
2. Enter the name (e.g. *The North Hoodie*) and price (e.g. *$89.00 CAD*). Save.
3. On that product, click **Create payment link** (or go to **Payment Links → New**).
4. *(Recommended)* Under the link's options, enable **"Let customers adjust quantity"**
   so the cart quantity is respected.
5. Copy the generated link — it looks like `https://buy.stripe.com/xxxxxxxxxxxx`.

Then open **`js/config.js`** and paste each link into the matching product's
`paymentLink` field:

```js
{
  id: "hoodie",
  name: "The North Hoodie",
  price: 89.0,
  image: "assets/hoodie.svg",
  paymentLink: "https://buy.stripe.com/YOUR_HOODIE_LINK", // 👈 paste here
},
```

Also update the `price` values if you want them to match your Stripe prices
(these are for display; Stripe always charges the real price from the link).

> **Test mode first:** Use links created while your dashboard is in *Test mode* to try
> checkout with Stripe's [test cards](https://stripe.com/docs/testing) (e.g. `4242 4242 4242 4242`).
> When ready, recreate the links in *Live mode* and paste the live URLs.

---

## 🚀 Step 2 — Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `profetional-canadian`).
2. Push this folder to it:

```bash
git init
git add .
git commit -m "Profetional Canadian storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/profetional-canadian.git
git push -u origin main
```

3. On GitHub: **Settings → Pages → Build and deployment**.
4. Set **Source** to **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**. Save.
5. Wait ~1 minute. Your site goes live at:
   `https://YOUR_USERNAME.github.io/profetional-canadian/`

That's it — the store is live and taking payments through Stripe. 🎉

---

## 🧪 Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## ✏️ Customizing

- **Prices / names / taglines:** `js/config.js`
- **Colors, fonts, layout:** `css/styles.css` (see `:root` variables at the top)
- **Copy (hero, about, footer):** `index.html`
- **Product images:** replace the SVGs in `assets/` (keep the same filenames, or update
  the `image` paths in `config.js`). Photos (`.jpg`/`.png`) work too.

---

## 🚚 Shipping calculator

The cart includes a **worldwide shipping calculator** that ships from Canada. The
customer picks their country and the shipping cost is added to the order total before
checkout.

Rates are **weight-based** and grouped into three Canada Post-style zones:

| Zone | Base | Per kg | Notes |
|------|------|--------|-------|
| Canada | $9.99 | $2.50 | **Free** over $150 subtotal |
| United States | $19.99 | $7.00 | |
| International (rest of world) | $34.99 | $14.00 | |

A flat `$1.99` handling fee is added to each order.
Formula: `base + (perKg × total cart weight) + handling`.

**Edit all of this in `js/config.js`:**

- `products[].weight` — each item's shipping weight in **kg**.
- `shipping.zones` — base + per-kg price for each zone.
- `shipping.handling` — flat packaging fee (set to `0` to remove).
- `shipping.freeThreshold` — free Canada shipping above this subtotal (`null` to disable).

> **Charging shipping through Stripe:** the on-site calculator shows the customer the
> shipping cost up front. To have Stripe *charge* it, open each Payment Link in your
> Stripe Dashboard → enable **"Collect shipping address"** and add matching **shipping
> rates** (Canada / US / International). Stripe then adds shipping at its checkout so the
> amount charged matches what the customer saw. For fully automatic, weight-perfect
> shipping in one combined charge, use a small serverless Checkout Session (see note below).

## ❓ How checkout works

- **Add to cart** builds a cart saved in the browser.
- **Checkout with Stripe**:
  - 1 product in cart → redirects straight to that product's Stripe page.
  - Multiple different products → opens one secure Stripe tab per product.
- Quantities are passed to Stripe via `?quantity=N` (works when "adjustable quantity"
  is enabled on the Payment Link).

> **Want a single combined checkout for many items?** That requires a tiny backend to
> create a Stripe Checkout Session. GitHub Pages can't run one, but you can add a free
> serverless function (Vercel, Netlify, Cloudflare Workers) later — the front-end here
> is ready for it. Ask and it can be wired up.

---

Made with 🍁 in Canada.
