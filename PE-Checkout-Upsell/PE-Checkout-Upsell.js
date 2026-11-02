(() => {
  "use strict";

  /* =====================================================
       PRINT EQUIPMENT
       PE Checkout Shipping Progress
       TEST VERSION
       ===================================================== */

  /* =====================================================
       1. ALLGEMEINE CONFIG
       ===================================================== */

  const CONFIG = {
    /*
     * TESTMODUS
     *
     * true:
     * Nur sichtbar mit:
     * ?pe-upsell-test=1
     *
     * false:
     * Für alle Checkout-Besucher sichtbar
     */
    testMode: true,

    testParameter: "pe-upsell-test",

    allowedPaths: [
      "/staging/checkout/confirm",

      "/staging/en/checkout/confirm",

      "/staging/fr/checkout/confirm",
    ],
  };

  /* =====================================================
       2. VERSANDREGELN NACH SPRACHE
       ===================================================== */

  const SHIPPING_CONFIG = {
    /*
     * DEUTSCHLAND
     *
     * Ab 200 € netto kostenlos
     * Sonst 8,70 €
     */
    "de-DE": {
      hasFreeShippingThreshold: true,

      threshold: 200,

      shippingCost: 8.7,
    },

    /*
     * INTERNATIONAL / EN
     *
     * KEINE feste Free-Shipping-Grenze
     *
     * Versandkosten abhängig
     * vom Zielland.
     */
    "en-GB": {
      hasFreeShippingThreshold: false,

      threshold: null,

      shippingCost: null,
    },

    /*
     * FRANKREICH
     *
     * Ab 500 € HT kostenlos
     * Sonst 15 €
     */
    "fr-FR": {
      hasFreeShippingThreshold: true,

      threshold: 500,

      shippingCost: 15.0,
    },
  };

  /* =====================================================
       3. PFAD NORMALISIEREN
       ===================================================== */

  const pathname = window.location.pathname.replace(/\/+$/, "");

  /* =====================================================
       4. NUR CHECKOUT CONFIRM
       ===================================================== */

  if (!CONFIG.allowedPaths.includes(pathname)) {
    return;
  }

  /* =====================================================
       5. TESTPARAMETER
       ===================================================== */

  const params = new URLSearchParams(window.location.search);

  if (CONFIG.testMode) {
    if (params.get(CONFIG.testParameter) !== "1") {
      return;
    }
  }

  /*
   * BODY markieren.
   *
   * CSS versteckt dadurch den
   * bisherigen Shipping-Banner.
   */

  document.body.classList.add("pe-upsell-test-active");

  /* =====================================================
       6. SPRACHE ERMITTELN
       ===================================================== */

  function getLanguage() {
    const htmlLang = (
      document.documentElement.getAttribute("lang") || ""
    ).toLowerCase();

    /* EN */

    if (htmlLang.startsWith("en") || pathname.startsWith("/en/")) {
      return "en-GB";
    }

    /* FR */

    if (htmlLang.startsWith("fr") || pathname.startsWith("/fr/")) {
      return "fr-FR";
    }

    /* DEFAULT DE */

    return "de-DE";
  }

  const language = getLanguage();

  const shippingConfig = SHIPPING_CONFIG[language] || SHIPPING_CONFIG["de-DE"];

  /* =====================================================
       7. TEXTE
       ===================================================== */

  const translations = {
    /* =================================================
           DE
           ================================================= */

    "de-DE": {
      remaining: "Nur noch {amount} bis zum kostenlosen Versand",

      description:
        "Ergänze deine Bestellung um {amount} (netto) und spare 8,70 € Versandkosten.",

      reached: "Kostenlosen Versand erreicht!",

      reachedDescription:
        "Dein Warenwert hat die Grenze von 200 € netto für den kostenlosen Versand innerhalb Deutschlands erreicht.",

      net: "(netto)",

      /*
       * Entspricht eurem bestehenden Banner:
       */

      freeShipping: "Ab 200 € versandkostenfrei¹",

      freeShippingSub: "innerhalb Deutschlands",

      shipping: "Versand nur 8,70 €¹",

      shippingSub: "pauschal pro Bestellung",

      order: "Bis 12 Uhr bestellt",

      orderSub: "heute versendet²",
    },

    /* =================================================
           EN
           ================================================= */

    "en-GB": {
      title: "International shipping",

      description: "Shipping costs depend on the destination country.",

      shipping: "Shipping costs & surcharges",

      shippingSub: "Provided with our invoice",

      order: "Order by 12 noon",

      orderSub: "ships the same day²",
    },

    /* =================================================
           FR
           ================================================= */

    "fr-FR": {
      remaining: "Plus que {amount} avant la livraison gratuite",

      description:
        "Ajoutez {amount} (HT) à votre commande et économisez 15,00 € de frais de livraison.",

      reached: "Livraison gratuite atteinte !",

      reachedDescription:
        "Votre commande a atteint le seuil de 500 € HT pour la livraison gratuite.",

      net: "(HT)",

      /*
       * Entspricht eurem bestehenden Banner:
       */

      freeShipping: "Livraison gratuite dès 500 €¹",

      freeShippingSub: "",

      shipping: "Livraison à seulement 15 €¹",

      shippingSub: "forfait par commande",

      order: "Commandé avant 12 h",

      orderSub: "expédié le jour même²",
    },
  };

  const t = translations[language] || translations["de-DE"];

  /* =====================================================
       8. PREIS FORMATIEREN
       ===================================================== */

  function formatPrice(value) {
    return new Intl.NumberFormat(language, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  /* =====================================================
       9. PREIS PARSEN
       ===================================================== */

  function parseEuropeanPrice(text) {
    if (!text) {
      return null;
    }

    let cleaned = String(text)
      .replace(/\u00a0/g, "")

      .replace(/\s/g, "")

      .replace(/[^\d,.-]/g, "");

    if (!cleaned) {
      return null;
    }

    /*
     * Beispiele:
     *
     * 18,84
     * 210,60
     * 1.234,56
     */

    if (cleaned.includes(",")) {
      cleaned = cleaned

        .replace(/\./g, "")

        .replace(",", ".");
    }

    const number = parseFloat(cleaned);

    return Number.isFinite(number) ? number : null;
  }

  /* =====================================================
       10. PREISE AUS TEXT EXTRAHIEREN
       ===================================================== */

  function extractPrices(text) {
    if (!text) {
      return [];
    }

    const matches = String(text).match(
      /(?:€\s*)?\d{1,3}(?:\.\d{3})*(?:,\d{2})\s*€?|(?:€\s*)?\d+(?:,\d{2})\s*€?/g,
    );

    if (!matches) {
      return [];
    }

    return matches

      .map(parseEuropeanPrice)

      .filter((value) => value !== null && Number.isFinite(value));
  }

  /* =====================================================
       11. TEXT NORMALISIEREN
       ===================================================== */

  function normalizeText(text) {
    return String(text || "")
      .replace(/\u00a0/g, " ")

      .replace(/\s+/g, " ")

      .trim()

      .toLowerCase();
  }

  /* =====================================================
       12. NETTO-WARENWERT / ZWISCHENSUMME
       =====================================================

       Wir verwenden bewusst:

       DE:
       Zwischensumme

       EN:
       Subtotal

       FR:
       Sous-total

       NICHT:

       Versandkosten
       Gesamtnettosumme
       MwSt.
       Gesamtsumme

       ===================================================== */

  function getNetCartValue() {
    const checkout = document.querySelector(".checkout-container");

    if (!checkout) {
      return null;
    }

    const subtotalLabels = [
      "zwischensumme",

      "subtotal",

      "sous-total",

      "sous total",
    ];

    const elements = checkout.querySelectorAll("span, div, p, td, th, dt, dd");

    for (const element of elements) {
      const text = normalizeText(element.textContent);

      /*
       * Exakt das Label finden.
       */

      if (!subtotalLabels.includes(text)) {
        continue;
      }

      /* =================================================
               A. NÄCHSTES SIBLING
               ================================================= */

      const sibling = element.nextElementSibling;

      if (sibling) {
        const prices = extractPrices(sibling.textContent);

        if (prices.length) {
          return prices[prices.length - 1];
        }
      }

      /* =================================================
               B. PARENT-ZEILE
               ================================================= */

      let parent = element.parentElement;

      for (let level = 0; level < 2 && parent; level++) {
        const parentText = normalizeText(parent.textContent);

        const startsWithSubtotal = subtotalLabels.some((label) =>
          parentText.startsWith(label),
        );

        if (!startsWithSubtotal) {
          break;
        }

        const prices = extractPrices(parent.textContent);

        if (prices.length) {
          return prices[prices.length - 1];
        }

        parent = parent.parentElement;
      }
    }

    /*
     * Kein Fallback auf Gesamtsumme.
     *
     * Lieber keinen neuen Banner anzeigen
     * als einen falschen Warenwert verwenden.
     */

    return null;
  }

  /* =====================================================
       13. ICON
       ===================================================== */

  const packageIcon = `

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">

            <path
                d="
                    M21 16V8
                    a2 2 0 0 0-1-1.73
                    l-7-4
                    a2 2 0 0 0-2 0
                    l-7 4
                    A2 2 0 0 0 3 8
                    v8
                    a2 2 0 0 0 1 1.73
                    l7 4
                    a2 2 0 0 0 2 0
                    l7-4
                    A2 2 0 0 0 21 16z
                ">
            </path>

            <polyline
                points="
                    3.27 6.96
                    12 12.01
                    20.73 6.96
                ">
            </polyline>

            <line
                x1="12"
                y1="22.08"
                x2="12"
                y2="12">
            </line>

        </svg>

    `;

  /* =====================================================
       14. DE / FR PROGRESS BLOCK
       ===================================================== */

  function createProgressBlock(cartValue) {
    const threshold = shippingConfig.threshold;

    const remaining = Math.max(
      threshold - cartValue,

      0,
    );

    const progress = Math.min(
      Math.max(
        (cartValue / threshold) * 100,

        0,
      ),

      100,
    );

    const reached = cartValue >= threshold;

    const title = reached
      ? t.reached
      : t.remaining.replace(
          "{amount}",

          formatPrice(remaining),
        );

    const description = reached
      ? t.reachedDescription
      : t.description.replace(
          "{amount}",

          formatPrice(remaining),
        );

    const element = document.createElement("section");

    element.id = "pe-checkout-upsell";

    element.setAttribute("data-pe-language", language);

    element.setAttribute("data-pe-cart-value", cartValue.toFixed(2));

    element.setAttribute("data-pe-threshold", threshold.toFixed(2));

    element.setAttribute("data-pe-progress", progress.toFixed(2));

    if (reached) {
      element.classList.add("pe-free-shipping");
    }

    element.innerHTML = `

            <div class="pe-upsell__inner">


                <div class="pe-upsell__shipping">


                    <div
                        class="
                            pe-upsell__shipping-icon
                        ">

                        ${packageIcon}

                    </div>


                    <div
                        class="
                            pe-upsell__shipping-content
                        ">


                        <h2
                            class="
                                pe-upsell__title
                            ">

                            ${title}

                        </h2>


                        <p
                            class="
                                pe-upsell__subtitle
                            ">

                            ${description}

                        </p>


                        <div
                            class="
                                pe-upsell__progress-row
                            ">


                            <div
                                class="
                                    pe-upsell__progress
                                "

                                role="progressbar"

                                aria-valuemin="0"

                                aria-valuemax="${threshold}"

                                aria-valuenow="${Math.min(
                                  cartValue,
                                  threshold,
                                ).toFixed(2)}">


                                <div
                                    class="
                                        pe-upsell__progress-bar
                                    "

                                    style="
                                        width:
                                        ${progress}%;
                                    ">
                                </div>


                            </div>


                            <div
                                class="
                                    pe-upsell__progress-value
                                ">

                                ${formatPrice(cartValue)}

                                /

                                ${formatPrice(threshold)}


                                <span
                                    class="
                                        pe-upsell__progress-net
                                    ">

                                    ${t.net}

                                </span>


                            </div>


                        </div>


                    </div>


                </div>


            </div>

        `;

    return element;
  }

  /* =====================================================
       15. EN INTERNATIONAL BLOCK
       ===================================================== */

  function createInternationalBlock() {
    const element = document.createElement("section");

    element.id = "pe-checkout-upsell";

    element.classList.add("pe-international-shipping");

    element.setAttribute("data-pe-language", language);

    element.innerHTML = `

            <div class="pe-upsell__inner">


                <div class="pe-upsell__shipping">


                    <div
                        class="
                            pe-upsell__shipping-icon
                        ">

                        ${packageIcon}

                    </div>


                    <div
                        class="
                            pe-upsell__shipping-content
                        ">


                        <h2
                            class="
                                pe-upsell__title
                            ">

                            ${t.title}

                        </h2>


                        <p
                            class="
                                pe-upsell__subtitle
                            ">

                            ${t.description}

                        </p>


                        <div
                            class="
                                pe-upsell__international-info
                            ">


                            <div
                                class="
                                    pe-upsell__info-item
                                ">


                                <div
                                    class="
                                        pe-upsell__info-title
                                    ">

                                    ${t.shipping}

                                </div>


                                <div
                                    class="
                                        pe-upsell__info-subtitle
                                    ">

                                    ${t.shippingSub}

                                </div>


                            </div>


                            <div
                                class="
                                    pe-upsell__info-item
                                ">


                                <div
                                    class="
                                        pe-upsell__info-title
                                    ">

                                    ${t.order}

                                </div>


                                <div
                                    class="
                                        pe-upsell__info-subtitle
                                    ">

                                    ${t.orderSub}

                                </div>


                            </div>


                        </div>


                    </div>


                </div>


            </div>

        `;

    return element;
  }

  /* =====================================================
       16. INITIALISIEREN
       ===================================================== */

  function initCheckoutUpsell() {
    /*
     * Nicht doppelt einfügen.
     */

    if (document.getElementById("pe-checkout-upsell")) {
      return;
    }

    const checkoutContainer = document.querySelector(".checkout-container");

    if (!checkoutContainer) {
      console.warn(
        "[PE Checkout Shipping] " + ".checkout-container nicht gefunden.",
      );

      /*
       * Alten Banner wieder zeigen.
       */

      document.body.classList.remove("pe-upsell-test-active");

      return;
    }

    let block;

    /* =================================================
           DE / FR
           MIT FREE-SHIPPING-GRENZE
           ================================================= */

    if (shippingConfig.hasFreeShippingThreshold) {
      const cartValue = getNetCartValue();

      /*
       * Sicherheitsmechanismus
       */

      if (cartValue === null || !Number.isFinite(cartValue)) {
        console.warn(
          "[PE Checkout Shipping] " +
            "Zwischensumme / Netto-Warenwert " +
            "konnte nicht sicher ermittelt werden.",
        );

        /*
         * Alten Banner wieder anzeigen.
         */

        document.body.classList.remove("pe-upsell-test-active");

        return;
      }

      block = createProgressBlock(cartValue);

      /* =============================================
               DEBUG
               ============================================= */

      const remaining = Math.max(
        shippingConfig.threshold - cartValue,

        0,
      );

      const progress = Math.min(
        (cartValue / shippingConfig.threshold) * 100,

        100,
      );

      console.info(
        "[PE Checkout Shipping]",

        {
          testMode: CONFIG.testMode,

          language: language,

          netCartValue: cartValue,

          threshold: shippingConfig.threshold,

          shippingCost: shippingConfig.shippingCost,

          remaining: remaining,

          progress: progress.toFixed(2) + "%",
        },
      );
    } else {

    /* =================================================
           EN
           INTERNATIONAL
           KEINE FREE-SHIPPING-GRENZE
           ================================================= */
      block = createInternationalBlock();

      console.info(
        "[PE Checkout Shipping]",

        {
          testMode: CONFIG.testMode,

          language: language,

          mode: "international-shipping",

          threshold: null,
        },
      );
    }

    /* =================================================
           BLOCK VOR CHECKOUT EINFÜGEN
           ================================================= */

    checkoutContainer.parentNode.insertBefore(
      block,

      checkoutContainer,
    );
  }

  /* =====================================================
       17. START
       ===================================================== */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",

      initCheckoutUpsell,
    );
  } else {
    initCheckoutUpsell();
  }
})();
