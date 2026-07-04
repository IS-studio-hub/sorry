/* =============================================================
   PROFETIONAL CANADIAN — STORE CONFIG
   -------------------------------------------------------------
   This is the ONLY file you need to edit to connect Stripe.
   Everything runs on a static site (GitHub Pages) — no server.

   HOW IT WORKS
   ------------
   Each product has a Stripe "Payment Link" (paymentLink).
   When a customer clicks "Buy now" (or Checkout in the cart),
   they're sent to Stripe's secure hosted checkout page.

   SETUP (see README.md for full step-by-step):
   1. In your Stripe Dashboard, create a Product + Price for each item.
   2. Create a Payment Link for each Price.
   3. Paste each Payment Link URL below into `paymentLink`.
   4. (Optional) Turn on "Adjustable quantity" on each Payment Link
      so customers can change quantity on Stripe's page.

   Prices below are DISPLAY ONLY. The real charge amount always
   comes from Stripe, based on the Payment Link you create.
   ============================================================= */

window.STORE_CONFIG = {
  currency: "CAD",
  currencySymbol: "$",

  // Optional: your Stripe publishable key (only needed if you later
  // add the advanced multi-item checkout — safe to leave blank).
  stripePublishableKey: "",

  // Where the "leave your email" form sends notifications.
  // Uses FormSubmit.co (no signup / no backend needed). The FIRST time
  // someone submits, FormSubmit emails this address a one-time link you
  // must click to activate — after that, every submission arrives by email.
  contactEmail: "hello@isexperience.house",

  // `weight` is the shipping weight in kilograms, used by the shipping calculator.
  products: [
    {
      id: "hoodie",
      chapter: "Chapter I",
      name: "Not Sorry Hoodie",
      tagline: "480gsm heavyweight fleece · unisex",
      price: 89.0,
      weight: 0.6,
      image: "assets/product-hoodie.jpg",
      // Paste your Stripe Payment Link here, e.g. "https://buy.stripe.com/xxxxxxxx"
      paymentLink: "",
    },
    {
      id: "tshirt",
      chapter: "Chapter II",
      name: "Excuse Me Tee",
      tagline: "Organic heavyweight cotton · boxy fit",
      price: 39.0,
      weight: 0.2,
      image: "assets/product-tshirt.jpg",
      paymentLink: "",
    },
    {
      id: "cap",
      chapter: "Chapter III",
      name: "Eh Team Cap",
      tagline: "Structured cotton twill · adjustable",
      price: 34.0,
      weight: 0.15,
      image: "assets/product-cap.jpg",
      paymentLink: "",
    },
    {
      id: "jacket",
      chapter: "Chapter IV",
      name: "Cold Shoulder Jacket",
      tagline: "Water-resistant shell · insulated",
      price: 179.0,
      weight: 1.2,
      image: "assets/product-jacket.jpg",
      paymentLink: "",
    },
  ],

  /* -----------------------------------------------------------
     SHIPPING — Canada-origin rates to anywhere in the world.
     Rates are weight-based (CAD). Modelled on Canada Post zones:
       CA   = within Canada (domestic)
       US   = United States
       INTL = rest of the world
     Formula per order:  base + (perKg * chargeable weight)
     `handling` is a flat packaging fee added to every order.
     `freeThreshold` gives free CANADA shipping over that subtotal
       (set to null to disable free shipping).
     Edit these numbers to match your real Canada Post contract.
     ----------------------------------------------------------- */
  shipping: {
    handling: 1.99,
    freeThreshold: 150, // free domestic (Canada) shipping over $150 CAD
    zones: {
      CA: { label: "Canada", base: 9.99, perKg: 2.5 },
      US: { label: "United States", base: 19.99, perKg: 7.0 },
      INTL: { label: "International", base: 34.99, perKg: 14.0 },
    },
  },
};
