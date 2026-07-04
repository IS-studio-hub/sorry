/* =============================================================
   SHIPPING CALCULATOR — ships from Canada to anywhere.
   Rates come from STORE_CONFIG.shipping (edit those numbers).
   This file provides the country list + the math.
   ============================================================= */
(function () {
  "use strict";

  // Full country list. Zone is derived: Canada = CA, United States = US,
  // everything else = INTL (international from Canada).
  var COUNTRY_NAMES = [
    "Canada", "United States",
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica",
    "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
    "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
    "Zimbabwe",
  ];

  function zoneFor(name) {
    if (name === "Canada") return "CA";
    if (name === "United States") return "US";
    return "INTL";
  }

  var COUNTRIES = COUNTRY_NAMES.map(function (n) {
    return { name: n, zone: zoneFor(n) };
  });

  // Total weight (kg) of the cart. cart = { productId: qty }
  function totalWeight(cart, products) {
    return Object.keys(cart).reduce(function (sum, id) {
      var p = products.find(function (x) {
        return x.id === id;
      });
      var w = p && typeof p.weight === "number" ? p.weight : 0.3;
      return sum + w * cart[id];
    }, 0);
  }

  // Returns { cost, zone, label, free } or null if no country chosen.
  function calc(cart, subtotal, countryName) {
    var cfg = (window.STORE_CONFIG && window.STORE_CONFIG.shipping) || {};
    var zones = cfg.zones || {};
    if (!countryName) return null;

    var zoneKey = zoneFor(countryName);
    var zone = zones[zoneKey];
    if (!zone) return null;

    // Free domestic shipping over the threshold.
    if (
      zoneKey === "CA" &&
      typeof cfg.freeThreshold === "number" &&
      subtotal >= cfg.freeThreshold
    ) {
      return { cost: 0, zone: zoneKey, label: zone.label, free: true };
    }

    var weight = Math.max(totalWeight(cart, window.STORE_CONFIG.products), 0.1);
    var handling = typeof cfg.handling === "number" ? cfg.handling : 0;
    var cost = zone.base + zone.perKg * weight + handling;
    cost = Math.round(cost * 100) / 100;

    return { cost: cost, zone: zoneKey, label: zone.label, free: false };
  }

  window.SHIPPING = {
    countries: COUNTRIES,
    calc: calc,
    totalWeight: totalWeight,
  };
})();
