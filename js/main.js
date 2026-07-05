(function () {
  "use strict";

  var cfg = window.STORE_CONFIG || { products: [], currencySymbol: "$" };
  var SYMBOL = cfg.currencySymbol || "$";
  var STORAGE_KEY = "pc_cart_v1";
  var COUNTRY_KEY = "pc_ship_country_v1";

  /* ---------- State ---------- */
  var cart = loadCart();
  var selectedCountry = localStorage.getItem(COUNTRY_KEY) || "";

  /* ---------- Helpers ---------- */
  function money(n) {
    return SYMBOL + Number(n).toFixed(2);
  }
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }
  function getProduct(id) {
    return cfg.products.find(function (p) {
      return p.id === id;
    });
  }
  function stripeConfigured() {
    return cfg.products.some(function (p) {
      return p.paymentLink && p.paymentLink.trim() !== "";
    });
  }
  function modalTitleFromName(name) {
    var word = (name || "").trim().split(/\s+/).pop().replace(/\./g, "");
    return word ? word.toUpperCase() + '<span class="dot">.</span>' : "";
  }
  function renderProductDetails(p) {
    var wrap = document.getElementById("productModalDetails");
    var model = document.getElementById("productModalModel");
    var sizeGuide = document.getElementById("productModalSizeGuide");
    if (!wrap) return;

    var html = "";

    if (p.details && p.details.length) {
      html +=
        '<dl class="product-modal-details-list">' +
        p.details
          .map(function (row) {
            return (
              '<div class="product-detail-row"><dt>' +
              row.title +
              "</dt><dd>" +
              row.body +
              "</dd></div>"
            );
          })
          .join("") +
        "</dl>";
    }

    if (p.care && p.care.length) {
      html +=
        '<div class="product-detail-care"><h4>Care instructions</h4><ul>' +
        p.care
          .map(function (item) {
            return "<li>" + item + "</li>";
          })
          .join("") +
        "</ul></div>";
    }

    if (html) {
      wrap.innerHTML = html;
      wrap.hidden = false;
    } else {
      wrap.innerHTML = "";
      wrap.hidden = true;
    }

    if (model) {
      if (p.modelNote) {
        model.textContent = p.modelNote;
        model.hidden = false;
      } else {
        model.textContent = "";
        model.hidden = true;
      }
    }

    if (sizeGuide) {
      if (p.sizeGuide) {
        sizeGuide.href = p.sizeGuide;
        sizeGuide.hidden = false;
      } else {
        sizeGuide.href = "#";
        sizeGuide.hidden = true;
      }
    }
  }

  function visibleProducts() {
    return cfg.products.filter(function (p) {
      return !p.hidden;
    });
  }

  /* ---------- Product modal ---------- */
  var activeProductId = null;
  var selectedSize = null;

  function openProductModal(id) {
    var p = getProduct(id);
    if (!p || p.hidden) return;

    activeProductId = id;
    selectedSize = (p.sizes && p.sizes[0]) || "M";

    var overlay = document.getElementById("productModalOverlay");
    var modal = document.getElementById("productModal");
    var img = document.getElementById("productModalImg");
    var chapter = document.getElementById("productModalChapter");
    var title = document.getElementById("productModalTitle");
    var tagline = document.getElementById("productModalTagline");
    var price = document.getElementById("productModalPrice");
    var desc = document.getElementById("productModalDesc");
    var sizes = document.getElementById("productModalSizes");

    if (img) {
      img.src = p.image;
      img.alt = p.name;
    }
    if (chapter) {
      var label = (p.chapter || "").toUpperCase();
      var meta = p.colorway ? p.colorway.toUpperCase() : "";
      if (p.blankStyle) meta = meta ? meta + " · " + p.blankStyle.toUpperCase() : p.blankStyle.toUpperCase();
      chapter.textContent = meta ? label + " — " + meta : label;
    }
    if (title) title.innerHTML = modalTitleFromName(p.name);
    if (tagline) tagline.textContent = p.modalTagline || p.tagline || "";
    if (price) price.textContent = money(p.price) + " " + (cfg.currency || "CAD");
    if (desc) desc.textContent = p.description || p.tagline || "";
    renderProductDetails(p);

    if (sizes) {
      var sizeList = p.sizes && p.sizes.length ? p.sizes : ["S", "M", "L", "XL"];
      sizes.innerHTML = sizeList
        .map(function (size) {
          var active = size === selectedSize ? " is-active" : "";
          return (
            '<button type="button" class="size-btn' +
            active +
            '" data-size="' +
            size +
            '">' +
            size +
            "</button>"
          );
        })
        .join("");

      sizes.querySelectorAll(".size-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          selectedSize = btn.getAttribute("data-size");
          sizes.querySelectorAll(".size-btn").forEach(function (b) {
            b.classList.toggle("is-active", b === btn);
          });
        });
      });
    }

    overlay.classList.add("show");
    modal.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    var overlay = document.getElementById("productModalOverlay");
    var modal = document.getElementById("productModal");
    if (!modal || !modal.classList.contains("open")) return;

    overlay.classList.remove("show");
    modal.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeProductId = null;
  }

  function addFromModal() {
    if (!activeProductId) return;
    addToCart(activeProductId, { fromModal: true });
    closeProductModal();
  }

  /* ---------- Render products ---------- */
  function renderProducts() {
    var grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = visibleProducts()
      .map(function (p) {
        return (
          '<article class="product-card" data-id="' + p.id + '" tabindex="0" role="button" aria-label="View ' + p.name + '">' +
          '<div class="product-media">' +
          (p.chapter ? '<span class="product-chapter">' + p.chapter + "</span>" : "") +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" />' +
          "</div>" +
          '<div class="product-body">' +
          '<h3 class="product-name">' + p.name + "</h3>" +
          '<p class="product-tagline">' + (p.tagline || "") + "</p>" +
          '<div class="product-foot">' +
          '<span class="product-price">' + money(p.price) + "</span>" +
          '<button class="btn btn-primary btn-add" data-id="' + p.id + '">Add to bag</button>' +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    grid.querySelectorAll(".product-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".btn-add")) return;
        openProductModal(card.getAttribute("data-id"));
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProductModal(card.getAttribute("data-id"));
        }
      });
    });

    grid.querySelectorAll(".btn-add").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        addToCart(btn.getAttribute("data-id"));
      });
    });
  }

  /* ---------- Cart actions ---------- */
  function addToCart(id, opts) {
    opts = opts || {};
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    updateCount();
    var p = getProduct(id);
    var label = p ? p.name : "Item";
    if (opts.fromModal && selectedSize) label += " (" + selectedSize + ")";
    showToast(label + " added to cart");
    if (!opts.fromModal) openCart();
  }
  function setQty(id, qty) {
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id] = qty;
    }
    saveCart();
    renderCart();
    updateCount();
  }
  function cartCount() {
    return Object.keys(cart).reduce(function (sum, id) {
      return sum + cart[id];
    }, 0);
  }
  function cartTotal() {
    return Object.keys(cart).reduce(function (sum, id) {
      var p = getProduct(id);
      return sum + (p ? p.price * cart[id] : 0);
    }, 0);
  }
  function updateCount() {
    var el = document.getElementById("cartCount");
    var n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "grid" : "none";
  }

  /* ---------- Render cart ---------- */
  function getShipping(subtotal) {
    if (!window.SHIPPING || !selectedCountry) return null;
    return window.SHIPPING.calc(cart, subtotal, selectedCountry);
  }

  function renderCart() {
    var wrap = document.getElementById("cartItems");
    var empty = document.getElementById("cartEmpty");
    var checkoutBtn = document.getElementById("checkoutBtn");
    var ids = Object.keys(cart);

    if (ids.length === 0) {
      wrap.innerHTML = "";
      empty.style.display = "flex";
      checkoutBtn.disabled = true;
    } else {
      empty.style.display = "none";
      wrap.innerHTML = ids
        .map(function (id) {
          var p = getProduct(id);
          if (!p) return "";
          var qty = cart[id];
          return (
            '<div class="cart-item">' +
            '<img src="' + p.image + '" alt="' + p.name + '" />' +
            '<div class="cart-item-info">' +
            '<span class="cart-item-name">' + p.name + "</span>" +
            '<span class="cart-item-price">' + money(p.price) + "</span>" +
            '<div class="qty">' +
            '<button class="qty-btn" data-act="dec" data-id="' + id + '">−</button>' +
            '<span class="qty-val">' + qty + "</span>" +
            '<button class="qty-btn" data-act="inc" data-id="' + id + '">+</button>' +
            '<button class="cart-item-remove" data-act="rm" data-id="' + id + '">Remove</button>' +
            "</div>" +
            "</div>" +
            '<span class="cart-item-line">' + money(p.price * qty) + "</span>" +
            "</div>"
          );
        })
        .join("");
    }

    // ----- Totals with shipping -----
    var subtotal = cartTotal();
    var subtotalEl = document.getElementById("cartSubtotal");
    var shipRow = document.getElementById("shipRow");
    var shipLabelEl = document.getElementById("shipLabel");
    var shipCostEl = document.getElementById("shipCost");
    var totalEl = document.getElementById("cartTotal");
    var noteEl = document.getElementById("cartNote");

    if (subtotalEl) subtotalEl.textContent = money(subtotal);

    var ship = getShipping(subtotal);
    var shippingCost = 0;
    var canCheckout = ids.length > 0;

    if (ids.length === 0) {
      if (shipRow) shipRow.style.display = "none";
      if (totalEl) totalEl.textContent = money(0);
      if (noteEl) noteEl.textContent = "Your cart is empty.";
      canCheckout = false;
    } else if (!ship) {
      if (shipRow) shipRow.style.display = "flex";
      if (shipLabelEl) shipLabelEl.textContent = "Shipping";
      if (shipCostEl) shipCostEl.textContent = "—";
      if (totalEl) totalEl.textContent = money(subtotal);
      if (noteEl)
        noteEl.textContent =
          "Select a country to calculate shipping. Taxes calculated at checkout.";
      canCheckout = false; // require a country before checkout
    } else {
      shippingCost = ship.cost;
      if (shipRow) shipRow.style.display = "flex";
      if (shipLabelEl)
        shipLabelEl.textContent = "Shipping to " + ship.label;
      if (shipCostEl)
        shipCostEl.textContent = ship.free ? "FREE" : money(ship.cost);
      if (totalEl) totalEl.textContent = money(subtotal + shippingCost);
      if (noteEl)
        noteEl.textContent = ship.free
          ? "Free shipping applied. Taxes calculated at checkout."
          : "Ships from Canada. Taxes calculated at checkout.";
    }

    if (checkoutBtn) checkoutBtn.disabled = !canCheckout;

    wrap.querySelectorAll("[data-act]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var act = btn.getAttribute("data-act");
        if (act === "inc") setQty(id, cart[id] + 1);
        else if (act === "dec") setQty(id, cart[id] - 1);
        else if (act === "rm") setQty(id, 0);
      });
    });

    var warn = document.getElementById("cartConfigWarning");
    if (warn) warn.hidden = stripeConfigured();
  }

  /* ---------- Drawer ---------- */
  function openCart() {
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("show");
    document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  }
  function closeCart() {
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("show");
    document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  }

  /* ---------- Checkout ---------- */
  function checkout() {
    var ids = Object.keys(cart);
    if (ids.length === 0) return;

    if (!selectedCountry) {
      showToast("Please select a country to calculate shipping");
      var sel = document.getElementById("shipCountry");
      if (sel) sel.focus();
      return;
    }

    if (!stripeConfigured()) {
      showToast("Add your Stripe Payment Links in js/config.js first");
      return;
    }

    // Static-site checkout: open the Stripe Payment Link for each product.
    // Single-item carts get a seamless one-tab handoff. Multi-item carts
    // open one secure Stripe tab per product line.
    var linkable = ids.filter(function (id) {
      var p = getProduct(id);
      return p && p.paymentLink;
    });

    if (linkable.length === 0) {
      showToast("No Stripe Payment Link set for these items");
      return;
    }

    if (linkable.length === 1) {
      var p = getProduct(linkable[0]);
      window.location.href = withQuantity(p.paymentLink, cart[linkable[0]]);
      return;
    }

    // Multiple distinct products: open each in a new tab.
    showToast("Opening secure Stripe checkout…");
    linkable.forEach(function (id, i) {
      var prod = getProduct(id);
      var url = withQuantity(prod.paymentLink, cart[id]);
      setTimeout(function () {
        window.open(url, "_blank", "noopener");
      }, i * 250);
    });
  }

  // Append ?quantity=N — Stripe Payment Links honor this when the link
  // has "Adjustable quantity" enabled.
  function withQuantity(url, qty) {
    if (!qty || qty <= 1) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "quantity=" + qty;
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function showToast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("show");
    }, 2600);
  }

  /* ---------- Country selector ---------- */
  function populateCountries() {
    var sel = document.getElementById("shipCountry");
    if (!sel || !window.SHIPPING) return;
    var opts = window.SHIPPING.countries
      .map(function (c) {
        var s = c.name === selectedCountry ? " selected" : "";
        return '<option value="' + c.name + '"' + s + ">" + c.name + "</option>";
      })
      .join("");
    sel.insertAdjacentHTML("beforeend", opts);
    sel.addEventListener("change", function () {
      selectedCountry = sel.value;
      try {
        localStorage.setItem(COUNTRY_KEY, selectedCountry);
      } catch (e) {}
      renderCart();
    });
  }

  /* ---------- Connect form (email capture) ---------- */
  function initConnectForm() {
    var form = document.getElementById("connectForm");
    if (!form) return;
    var input = document.getElementById("connectEmail");
    var btn = document.getElementById("connectBtn");
    var msg = document.getElementById("connectMsg");
    var email = (cfg.contactEmail || "").trim();

    function showMsg(text, ok) {
      msg.textContent = text;
      msg.hidden = false;
      msg.classList.toggle("is-error", !ok);
      msg.classList.toggle("is-ok", ok);
    }

    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (input.value || "").trim();
      if (!re.test(value)) {
        showMsg("Please enter a valid email address.", false);
        input.focus();
        return;
      }
      if (!email) {
        showMsg("Form isn't configured yet. Set contactEmail in js/config.js.", false);
        return;
      }

      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = "Sending…";

      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(email), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: value,
          _subject: "SORRY. — someone wants to talk",
          message:
            "Someone wants to talk. They left their email on the SORRY. site: " +
            value,
          _template: "table",
        }),
      })
        .then(function (r) {
          return r.json().catch(function () {
            return {};
          });
        })
        .then(function () {
          form.reset();
          showMsg("Thanks — we'll be in touch soon.", true);
        })
        .catch(function () {
          showMsg("Something went wrong. Please try again.", false);
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }

  /* ---------- Wire up ---------- */
  function init() {
    initConnectForm();
    renderProducts();
    populateCountries();
    renderCart();
    updateCount();

    document.getElementById("cartBtn").addEventListener("click", openCart);
    document.getElementById("cartClose").addEventListener("click", closeCart);
    document.getElementById("cartOverlay").addEventListener("click", closeCart);
    document.getElementById("checkoutBtn").addEventListener("click", checkout);
    document.getElementById("productModalClose").addEventListener("click", closeProductModal);
    document.getElementById("productModalOverlay").addEventListener("click", closeProductModal);
    document.getElementById("productModalAdd").addEventListener("click", addFromModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (document.getElementById("productModal").classList.contains("open")) {
          closeProductModal();
        } else {
          closeCart();
        }
      }
    });

    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 40);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
