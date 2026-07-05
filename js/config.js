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
  stripePublishableKey:
    "pk_live_51RWeVnELNCReRhXx2v8bdtVZe8rLJTRDX49ATtJxMhzzDqRDIbkcGLprWDf0RliHSvQNxprnzSAsY1xw0jHJm8bV00ivLibg6N",

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
      modalTagline: "For the mornings that owe you something.",
      colorway: "Charcoal / Black",
      blankStyle: "AS Colour Relax Hood 5161",
      modelNote: "Model wears size L and is 5'10\" / 178cm tall.",
      description:
        "Relaxed fit with mid weight 9.4 oz fleece. Pullover style, drop shoulder, kangaroo pocket, and ribbed sleeve cuffs, with a self-fabric lined hood and tear-out label. Embroidered SORRY. mark on the chest. Saving approx. 8 500ml plastic bottles from landfill.",
      details: [
        {
          title: "Fit",
          body: "Relaxed",
        },
        {
          title: "Fabric",
          body:
            "Mid weight, 9.4 oz, 80% cotton 20% recycled polyester CVC fleece. Cotton facing on fleece.",
        },
        {
          title: "Construction",
          body:
            "Pre-shrunk to minimise shrinkage, pullover hood, drop shoulder, kangaroo pocket, self-fabric lined hood, no drawcord, sleeve cuff ribbing. Tear-out label.",
        },
        {
          title: "Embellishment",
          body: "Suited for screen printing, DTG and embroidery.",
        },
        {
          title: "Credentials",
          body: "Global Recycled Standard certified. Vegan.",
        },
        {
          title: "Origin",
          body: "Made in Vietnam.",
        },
      ],
      care: [
        "Machine wash cold with like colours.",
        "Do not bleach.",
        "Do not tumble dry.",
        "Do not dry clean.",
        "Do not iron if printed.",
        "Line dry in shade.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/5161_SIZE_GUIDE.jpg",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      price: 89.0,
      weight: 0.6,
      image: "assets/product-hoodie.jpg",
      // Paste your Stripe Payment Link here, e.g. "https://buy.stripe.com/xxxxxxxx"
      paymentLink: "https://buy.stripe.com/dRmeVd3wtfDE9D54Dr4Ja01",
    },
    {
      id: "tshirt",
      chapter: "Chapter II",
      name: "Excuse Me Tee",
      tagline: "Organic heavyweight cotton · boxy fit",
      modalTagline: "For when you need to pass, politely.",
      colorway: "Off-White / Stone",
      blankStyle: "AS Colour Classic Pocket Tee 5027",
      modelNote: "Model wears size L and is 5'10\" / 178cm tall.",
      description:
        "Regular fit with heavy weight 6.5 oz, 22-singles 100% combed cotton. Tonal colour chest pocket, neck ribbing, side seams, shoulder-to-shoulder tape, and double needle hems. Preshrunk to minimise shrinkage. Embroidered SORRY. mark on the chest.",
      details: [
        {
          title: "Fit",
          body: "Regular",
        },
        {
          title: "Fabric",
          body:
            "Heavy weight, 6.5 oz, 22-singles, 100% combed cotton (marles 15% viscose).",
        },
        {
          title: "Construction",
          body:
            "Crew neck, tonal colour pocket, neck ribbing, side seamed, shoulder to shoulder tape, double needle hems, preshrunk to minimise shrinkage.",
        },
        {
          title: "Embellishment",
          body: "Suited for screen printing, DTG and embroidery.",
        },
        {
          title: "Credentials",
          body: "Vegan. UPF 50+.",
        },
        {
          title: "Origin",
          body: "Made in Bangladesh.",
        },
      ],
      care: [
        "Machine wash cold with like colours.",
        "Do not bleach.",
        "Do not tumble dry.",
        "Do not dry clean.",
        "Do not iron if printed.",
        "Line dry in shade.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/5027_SIZE_GUIDE_1.jpg",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
      price: 39.0,
      weight: 0.2,
      image: "assets/product-tshirt.jpg",
      paymentLink: "https://buy.stripe.com/7sY5kDc2Zbnog1t3zn4Ja02",
    },
    {
      id: "cap",
      chapter: "Chapter III",
      name: "Eh Team Cap",
      tagline: "Structured cotton twill · adjustable",
      modalTagline: "For the ones who get it.",
      colorway: "Navy / Cream",
      blankStyle: "AS Colour Finn Five Panel Cap 1103",
      description:
        "Mid-weight, low-profile five panel cap with a flat peak, crafted from 100% cotton for durability and breathability. Adjustable plastic fastener and metal side eyelets. One size fits all. Embroidered SORRY. mark front and centre.",
      details: [
        {
          title: "Fit",
          body: "Low profile",
        },
        {
          title: "Fabric",
          body: "Mid weight, 100% cotton",
        },
        {
          title: "Construction",
          body:
            "Five panel cap, flat peak. Adjustable plastic fastener, metal side eyelets. One size fits all. Tear-out label.",
        },
        {
          title: "Embellishment",
          body: "Suited for embroidery and heat press.",
        },
        {
          title: "Credentials",
          body: "Vegan. UPF 50+.",
        },
        {
          title: "Origin",
          body: "Made in Vietnam (old stock made in China).",
        },
      ],
      care: [
        "Spot clean only.",
        "Do not bleach.",
        "Do not tumble dry.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/1103_SIZE_GUIDE.jpg",
      sizes: ["OS"],
      price: 34.0,
      weight: 0.15,
      image: "assets/product-cap.jpg",
      paymentLink: "https://buy.stripe.com/aFafZhffbfDEaH9fi54Ja03",
    },
    {
      id: "jacket",
      chapter: "Chapter IV",
      name: "Cold Shoulder Jacket",
      tagline: "Water-resistant shell · insulated",
      modalTagline: "For the weather that doesn't ask permission.",
      colorway: "Black / Graphite",
      blankStyle: "AS Colour Canvas Hooded Jacket 5529",
      modelNote: "Model wears size L and is 5'10\" / 178cm tall.",
      description:
        "Heavy weight cotton duck canvas with a quilted recycled polyester lining. Lined hood, adjustable cuffs and hem, YKK zip closure, and patch pockets. Designed with an invisible zip for effortless branding. Embroidered SORRY. mark on the chest.",
      details: [
        {
          title: "Fit",
          body: "Regular",
        },
        {
          title: "Fabric",
          body:
            "Heavy weight, 13.8 oz, 100% cotton duck canvas, 100% recycled polyester quilted lining.",
        },
        {
          title: "Construction",
          body:
            "Tonal drawcord, lined hood, internal pocket, 2 patch and 2 side pockets, YKK zip, adjustable cuffs and hem. Note: some older stock may not have the invisible side pocket. Floating lining to assist with branding.",
        },
        {
          title: "Embellishment",
          body: "Suited for screen printing, embroidery and heat pressing.",
        },
        {
          title: "Credentials",
          body: "Global Recycled Standard certified. Vegan.",
        },
        {
          title: "Origin",
          body: "Made in China.",
        },
      ],
      care: [
        "Hand wash only.",
        "Do not tumble dry.",
        "Do not dry clean.",
        "Do not iron.",
        "Line dry.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/5529_SIZE_GUIDE.jpg",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
      price: 179.0,
      weight: 1.2,
      image: "assets/product-jacket.jpg",
      paymentLink: "https://buy.stripe.com/dRmeVd1ol8bc6qTb1P4Ja04",
    },
    {
      id: "women-hoodie",
      chapter: "Chapter V",
      name: "Forgive Me Not Hoodie",
      tagline: "480gsm heavyweight fleece · tailored women's fit",
      modalTagline: "For the apology you never owed.",
      colorway: "Mocha / Taupe",
      blankStyle: "AS Colour Wo's Relax Faded Crew 4165",
      modelNote: "Model wears size S and is 5'9\" / 175cm tall.",
      description:
        "Relaxed fit with mid weight 9.4 oz fleece. Pullover crew, drop shoulder, crew neck, garment dyed with a faded effect on exposed edges. Sleeve cuff ribbing and tear-out label. Embroidered SORRY. mark on the chest. Saving approx. 5 500ml plastic bottles from landfill.",
      details: [
        {
          title: "Fit",
          body: "Relaxed",
        },
        {
          title: "Fabric",
          body:
            "Mid weight, 9.4 oz, 80% cotton 20% recycled polyester CVC fleece. Cotton facing on fleece.",
        },
        {
          title: "Construction",
          body:
            "Pre-shrunk to minimise shrinkage, pullover crew, drop shoulder, crew neck, garment dyed, sleeve cuff ribbing. Tear-out label.",
        },
        {
          title: "Garment dye",
          body:
            "Garments begin as pre-made, undyed fabrics. After dipping into vats, the dye flows with the contours of the garment, resulting in a faded effect on the exposed edges and a deeper hue in the creases where the dye collects.",
        },
        {
          title: "Embellishment",
          body:
            "Suited for screen printing, embroidery, DTG, and heat pressing. Use a blocker when printing on faded or stone washed garments.",
        },
        {
          title: "Credentials",
          body: "Global Recycled Standard certified. Vegan.",
        },
        {
          title: "Origin",
          body: "Made in China.",
        },
      ],
      care: [
        "Machine wash cold with like colours.",
        "Do not bleach.",
        "Do not tumble dry.",
        "Do not dry clean.",
        "Do not iron if printed.",
        "Line dry in shade.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/4165_SIZE_GUIDE.jpg",
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      price: 89.0,
      weight: 0.55,
      image: "assets/product-women-hoodie.jpg",
      paymentLink: "",
    },
    {
      id: "women-tshirt",
      chapter: "Chapter VI",
      name: "My Pleasure Tee",
      tagline: "Organic heavyweight cotton · tailored women's fit",
      modalTagline: "For the yes that was always yours.",
      colorway: "Off-White / Stone",
      blankStyle: "AS Colour Wo's Heavy Faded Tee 4082",
      modelNote: "Model wears size S and is 5'7\" / 170cm tall.",
      description:
        "Crafted from 100% carded cotton with a heavy 7.1 oz weight and garment dyed finish. Relaxed fit with shoulder to shoulder tape and twin-stitched wide neck ribbing. Embroidered SORRY. mark on the chest. Built to last for a timeless, relaxed look.",
      details: [
        {
          title: "Fit",
          body: "Relaxed",
        },
        {
          title: "Fabric",
          body: "Heavy weight, 7.1 oz, 16 singles, 100% carded cotton.",
        },
        {
          title: "Construction",
          body:
            "Wide neck ribbing, garment dyed, side seamed, shoulder to shoulder tape, double needle hems, preshrunk to minimise shrinkage. Tear-out label.",
        },
        {
          title: "Garment dye",
          body:
            "Garments begin as pre-made, undyed fabrics. After dipping into vats, the dye flows with the contours of the garment, resulting in a faded effect on the exposed edges and a deeper hue in the creases where the dye collects.",
        },
        {
          title: "Embellishment",
          body:
            "Suited for screen printing, embroidery, DTG, and heat pressing. Use a blocker when printing on faded or stone washed garments.",
        },
        {
          title: "Credentials",
          body: "Vegan. UPF 50+.",
        },
        {
          title: "Origin",
          body: "Made in China.",
        },
      ],
      care: [
        "Machine wash cold with like colours.",
        "Do not bleach.",
        "Do not tumble dry.",
        "Do not dry clean.",
        "Do not iron if printed.",
        "Line dry in shade.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/4082_SIZE_GUIDE.jpg",
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      price: 39.0,
      weight: 0.18,
      image: "assets/product-women-tshirt.jpg",
      paymentLink: "",
    },
    {
      id: "women-cap",
      chapter: "Chapter VII",
      name: "All Yours Cap",
      tagline: "Structured cotton twill · adjustable · women's fit",
      modalTagline: "For the crown you already wear.",
      colorway: "Mocha / Taupe",
      blankStyle: "AS Colour Access Cap 1130",
      description:
        "Low-profile, six-panel design with a curved peak, crafted from lightweight 100% cotton. Adjustable fastener with a metal clasp and tonal under-peak lining. One size fits all. Embroidered SORRY. mark front and centre.",
      details: [
        {
          title: "Fit",
          body: "Low profile",
        },
        {
          title: "Fabric",
          body: "Light weight, 100% cotton",
        },
        {
          title: "Construction",
          body:
            "Six panel cap, curved peak. Adjustable fastener with metal clasp, tonal under-peak lining. One size fits all. Tear-out label.",
        },
        {
          title: "Embellishment",
          body: "Suited for embroidery and heat press.",
        },
        {
          title: "Credentials",
          body: "Vegan. UPF 50+.",
        },
        {
          title: "Origin",
          body: "Made in Thailand (old stock made in China).",
        },
      ],
      care: [
        "Spot clean only.",
        "Do not bleach.",
        "Do not tumble dry.",
      ],
      sizeGuide:
        "https://cdn11.bigcommerce.com/s-hsi95a83fz/product_images/uploaded_images/SIZE_GUIDES/1130_SIZE_GUIDE.jpg",
      sizes: ["OS"],
      price: 34.0,
      weight: 0.15,
      image: "assets/product-women-cap.jpg",
      paymentLink: "",
    },
    {
      id: "women-jacket",
      chapter: "Chapter VIII",
      name: "Kind Regards Jacket",
      tagline: "Water-resistant shell · insulated · women's fit",
      modalTagline: "For the exit that needed no explanation.",
      colorway: "Black / Graphite",
      description:
        "Water-resistant shell with lightweight insulation in a tailored women's fit. Snap-front closure, zip pockets, and an embroidered SORRY. mark. Made in Canada.",
      sizes: ["XS", "S", "M", "L"],
      price: 179.0,
      weight: 1.0,
      image: "assets/product-women-jacket.jpg",
      paymentLink: "",
      hidden: true,
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
