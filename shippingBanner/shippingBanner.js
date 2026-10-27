/**
 * Print Equipment – Shipping Benefits Banner
 * Shopware 6.5.8.16
 *
 * Fügt den Banner direkt nach:
 * <div id="mainBanner" class="pe-banner ...">
 *
 * Sprachen:
 * de-DE
 * en-GB
 * fr-FR
 */

(function () {
  "use strict";

  const translations = {
    "de-DE": {
      freeShipping:
        'Ab 200 € <span class="pe-shipping-benefits__highlight">versandkostenfrei</span><sup>1</sup>',
      freeShippingSub: "innerhalb Deutschlands",

      shipping: "Versand nur 8,70 €<sup>1</sup>",
      shippingSub: "pauschal pro Bestellung",

      order: "Bis 12 Uhr bestellt",
      orderSub: "heute versendet<sup>2</sup>",
    },

    "en-GB": {
      freeShipping:
        '<span class="pe-shipping-benefits__highlight">Free shipping from €500</span><sup>1</sup>',
      freeShippingSub: "",

      shipping: "Shipping only €11.70<sup>1</sup>",
      shippingSub: "flat rate per order",

      order: "Order by 12 noon",
      orderSub: "ships the same day<sup>2</sup>",
    },

    "fr-FR": {
      freeShipping:
        '<span class="pe-shipping-benefits__highlight">Livraison gratuite dès 500 €</span><sup>1</sup>',
      freeShippingSub: "",

      shipping: "Livraison à seulement 15 €<sup>1</sup>",
      shippingSub: "forfait par commande",

      order: "Commandé avant 12 h",
      orderSub: "expédié le jour même<sup>2</sup>",
    },
  };

  /* ----------------------------------------------------------
       SVG Icons
       ---------------------------------------------------------- */

  const icons = {
    package: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        `,

    truck: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        `,

    clock: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9"></circle>
                <polyline points="12 7 12 12 15.5 14"></polyline>
            </svg>
        `,
  };

  function getLanguage() {
    const htmlLang = document.documentElement.getAttribute("lang") || "de-DE";

    if (translations[htmlLang]) {
      return htmlLang;
    }

    const normalizedLang = htmlLang.toLowerCase();

    if (normalizedLang.startsWith("en")) {
      return "en-GB";
    }

    if (normalizedLang.startsWith("fr")) {
      return "fr-FR";
    }

    return "de-DE";
  }

  function createItem(icon, title, subtitle) {
    return `
            <div class="pe-shipping-benefits__item">
                <div class="pe-shipping-benefits__icon">
                    ${icon}
                </div>

                <div class="pe-shipping-benefits__content">
                    <div class="pe-shipping-benefits__title">
                        ${title}
                    </div>

                    <div class="pe-shipping-benefits__subtitle">
                        ${subtitle}
                    </div>
                </div>
            </div>
        `;
  }

  function createBanner() {
    const language = getLanguage();
    const text = translations[language];

    const banner = document.createElement("div");

    banner.className = "pe-shipping-benefits";
    banner.setAttribute("data-pe-shipping-benefits", "true");

    banner.innerHTML = `
            <div class="pe-shipping-benefits__inner">

                ${createItem(
                  icons.package,
                  text.freeShipping,
                  text.freeShippingSub,
                )}

                ${createItem(icons.truck, text.shipping, text.shippingSub)}

                ${createItem(icons.clock, text.order, text.orderSub)}

            </div>
        `;

    return banner;
  }

  function initShippingBanner() {
    // Nicht doppelt einfügen
    if (document.querySelector('[data-pe-shipping-benefits="true"]')) {
      return;
    }

    /*
     * Exakt dein Element:
     *
     * <div id="mainBanner"
     *      class="pe-banner carousel slide carousel-fade main-hero">
     */
    const mainBanner = document.querySelector("#mainBanner");

    if (!mainBanner) {
      return;
    }

    const shippingBanner = createBanner();

    mainBanner.insertAdjacentElement("afterend", shippingBanner);
  }

  /*
   * Normaler Seitenaufruf
   */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShippingBanner);
  } else {
    initShippingBanner();
  }
})();
