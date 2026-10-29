/**
 * ==========================================================
 * PRINT EQUIPMENT
 * Shipping Benefits Banner
 * Shopware 6.5.8.16
 *
 * HOMEPAGE:
 * Banner nach:
 * #mainBanner
 *
 * CHECKOUT:
 * Banner nach:
 * header.header-minimal
 *
 * Sprachen:
 * de-DE
 * en-GB
 * fr-FR
 * ==========================================================
 */

(function () {
  "use strict";

  /* ========================================================
     TRANSLATIONS
     ======================================================== */

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
        '<span class="pe-shipping-benefits__highlight">International shipping</span>',

      freeShippingSub: "Shipping costs depend on the destination country",

      shipping: "Shipping costs & surcharges",

      shippingSub: "Provided with our invoice",

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

  /* ========================================================
     ICONS
     ======================================================== */

  const icons = {
    package: `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        ></path>

        <polyline
          points="3.27 6.96 12 12.01 20.73 6.96"
        ></polyline>

        <line
          x1="12"
          y1="22.08"
          x2="12"
          y2="12"
        ></line>
      </svg>
    `,

    truck: `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >

        <rect
          x="1"
          y="3"
          width="15"
          height="13"
        ></rect>

        <polygon
          points="16 8 20 8 23 11 23 16 16 16 16 8"
        ></polygon>

        <circle
          cx="5.5"
          cy="18.5"
          r="2.5"
        ></circle>

        <circle
          cx="18.5"
          cy="18.5"
          r="2.5"
        ></circle>

      </svg>
    `,

    clock: `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >

        <circle
          cx="12"
          cy="12"
          r="9"
        ></circle>

        <polyline
          points="12 7 12 12 15.5 14"
        ></polyline>

      </svg>
    `,
  };

  /* ========================================================
     LANGUAGE
     ======================================================== */

  function getLanguage() {
    const htmlLang = (document.documentElement.getAttribute("lang") || "de-DE")
      .trim()
      .toLowerCase();

    /*
     * EN
     */
    if (htmlLang === "en-gb" || htmlLang.startsWith("en")) {
      return "en-GB";
    }

    /*
     * FR
     */
    if (htmlLang === "fr-fr" || htmlLang.startsWith("fr")) {
      return "fr-FR";
    }

    /*
     * Default DE
     */
    return "de-DE";
  }

  /* ========================================================
     URL / PATH
     ======================================================== */

  function getPath() {
    /*
     * Trailing Slash entfernen:
     *
     * /checkout/confirm/
     *
     * wird zu:
     *
     * /checkout/confirm
     */

    return window.location.pathname.replace(/\/+$/, "");
  }

  /* ========================================================
     CHECKOUT ERKENNEN
     ======================================================== */

  function isCheckoutConfirmPage() {
    const path = getPath();

    return (
      path === "/staging/checkout/confirm" ||
      path === "/staging/en/checkout/confirm" ||
      path === "/staging/fr/checkout/confirm"
    );
  }

  /* ========================================================
     ITEM HTML
     ======================================================== */

  function createItem(icon, title, subtitle) {
    /*
     * Leerer Subtitle bei FR ist erlaubt.
     *
     * Dadurch wird keine unnötige leere Zeile ausgegeben.
     */

    const subtitleHTML = subtitle
      ? `
        <div class="pe-shipping-benefits__subtitle">
          ${subtitle}
        </div>
      `
      : "";

    return `

      <div class="pe-shipping-benefits__item">

        <div class="pe-shipping-benefits__icon">
          ${icon}
        </div>


        <div class="pe-shipping-benefits__content">

          <div class="pe-shipping-benefits__title">
            ${title}
          </div>

          ${subtitleHTML}

        </div>

      </div>

    `;
  }

  /* ========================================================
     BANNER INHALT
     ======================================================== */

  function getBannerHTML(language) {
    const text = translations[language];

    if (!text) {
      return "";
    }

    return `

      <div class="pe-shipping-benefits__inner">

        ${createItem(icons.package, text.freeShipping, text.freeShippingSub)}


        ${createItem(icons.truck, text.shipping, text.shippingSub)}


        ${createItem(icons.clock, text.order, text.orderSub)}

      </div>

    `;
  }

  /* ========================================================
     BANNER ELEMENT ERSTELLEN
     ======================================================== */

  function createBannerElement(type) {
    const language = getLanguage();

    const banner = document.createElement("div");

    banner.className = "pe-shipping-benefits";

    /*
     * Homepage oder Checkout
     */
    if (type === "checkout") {
      banner.classList.add("pe-shipping-benefits--checkout");
    } else {
      banner.classList.add("pe-shipping-benefits--homepage");
    }

    banner.setAttribute("data-pe-shipping-benefits", "true");

    banner.setAttribute("data-pe-banner-location", type);

    banner.setAttribute("data-language", language);

    /*
     * Accessibility
     */
    banner.setAttribute("role", "region");

    banner.setAttribute("aria-label", "Shipping information");

    banner.innerHTML = getBannerHTML(language);

    return banner;
  }

  /* ========================================================
     BESTEHENDEN BANNER AKTUALISIEREN
     ======================================================== */

  function updateExistingBanner(banner) {
    if (!banner) {
      return;
    }

    const language = getLanguage();

    /*
     * Sprache aktualisieren
     */
    banner.setAttribute("data-language", language);

    /*
     * Text aktualisieren
     */
    banner.innerHTML = getBannerHTML(language);
  }

  /* ========================================================
     HOMEPAGE BANNER
     ======================================================== */

  function initHomepageBanner() {
    /*
     * Checkout hier ausschließen.
     */
    if (isCheckoutConfirmPage()) {
      return;
    }

    /*
     * Dein bestehender Hero:
     *
     * <div
     *   id="mainBanner"
     *   class="carousel ..."
     * >
     */
    const mainBanner = document.querySelector("#mainBanner");

    /*
     * Wenn kein MainBanner existiert,
     * sind wir wahrscheinlich nicht auf der Homepage.
     */
    if (!mainBanner) {
      return;
    }

    /*
     * Prüfen, ob Homepage-Banner bereits existiert.
     */
    let existingBanner = document.querySelector(
      '[data-pe-banner-location="homepage"]',
    );

    /*
     * Existiert bereits:
     * nur Sprache/Inhalt aktualisieren.
     */
    if (existingBanner) {
      updateExistingBanner(existingBanner);

      return;
    }

    /*
     * Neuen Banner erstellen.
     */
    const banner = createBannerElement("homepage");

    /*
     * DIREKT NACH HERO
     */
    mainBanner.insertAdjacentElement("afterend", banner);
  }

  /* ========================================================
     CHECKOUT BANNER
     ======================================================== */

  function initCheckoutBanner() {
    /*
     * Nur diese Seiten:
     *
     * DE:
     * /checkout/confirm
     *
     * EN:
     * /en/checkout/confirm
     *
     * FR:
     * /fr/checkout/confirm
     */
    if (!isCheckoutConfirmPage()) {
      return;
    }

    /*
     * Shopware Minimal Header:
     *
     * <header class="header-minimal">
     */
    const header = document.querySelector("header.header-minimal");

    /*
     * Header noch nicht vorhanden?
     */
    if (!header) {
      console.warn(
        "PE Shipping Banner: header.header-minimal wurde noch nicht gefunden.",
      );

      return;
    }

    /*
     * Prüfen, ob Checkout-Banner
     * bereits existiert.
     */
    let existingBanner = document.querySelector(
      '[data-pe-banner-location="checkout"]',
    );

    /*
     * Existiert bereits:
     * Sprache aktualisieren.
     */
    if (existingBanner) {
      updateExistingBanner(existingBanner);

      return;
    }

    /*
     * Neuen Checkout Banner erstellen.
     */
    const banner = createBannerElement("checkout");

    /*
     * =====================================================
     * WICHTIG
     *
     * DIREKT NACH:
     *
     * <header class="header-minimal">
     *
     * </header>
     *
     * wird der Banner eingesetzt.
     * =====================================================
     */

    header.insertAdjacentElement("afterend", banner);
  }

  /* ========================================================
     GLOBAL INIT
     ======================================================== */

  function initShippingBenefits() {
    /*
     * Checkout
     */
    if (isCheckoutConfirmPage()) {
      initCheckoutBanner();

      return;
    }

    /*
     * Homepage
     */
    initHomepageBanner();
  }

  /* ========================================================
     START
     ======================================================== */

  function start() {
    /*
     * Sofort
     */
    initShippingBenefits();

    /*
     * Shopware Sicherheit:
     * Falls CMS/Header verzögert gerendert wird.
     */
    window.setTimeout(initShippingBenefits, 250);

    window.setTimeout(initShippingBenefits, 750);

    window.setTimeout(initShippingBenefits, 1500);
  }

  /* ========================================================
     DOM READY
     ======================================================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
