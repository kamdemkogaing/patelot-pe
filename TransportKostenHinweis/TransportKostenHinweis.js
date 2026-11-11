(() => {
  "use strict";

  const TRANSLATIONS = {
    "de-DE": {
      label: "Versandkosten",
      value: "Nachberechnung",
      title: "Transportkosten: Nachberechnung",
      message:
        "Die Transportkosten werden nach Gewicht und Abmessungen berechnet und nachträglich auf Ihrer Rechnung ausgewiesen.",
    },
    "en-GB": {
      label: "Shipping costs",
      value: "Calculated separately",
      title: "Transport costs: Calculated separately",
      message:
        "Transport costs are calculated based on weight and dimensions and will be charged separately on your invoice.",
    },
    "fr-FR": {
      label: "Frais de livraison",
      value: "Calculés séparément",
      title: "Frais de transport : calculés séparément",
      message:
        "Les frais de transport sont calculés en fonction du poids et des dimensions et seront facturés séparément sur votre facture.",
    },
  };

  const SHIPPING_NAMES = [
    "Versand per FedEx (TK nachberechnen)",
    "Shipping via FedEx (transport costs calculated separately)",
    "Expédition par FedEx (frais de transport calculés séparément)",
    "Versand per DSV (TK nachberechnen)",
    "Shipping via DSV (transport costs calculated separately)",
    "Expédition par DSV (frais de transport calculés séparément)",
  ];

  const NOTE_CLASS = "pe-transport-note";
  const VALUE_CLASS = "pe-transport-value";

  function lang() {
    const current = (document.documentElement.lang || "de-DE").toLowerCase();

    if (current.startsWith("en")) return "en-GB";
    if (current.startsWith("fr")) return "fr-FR";
    return "de-DE";
  }

  function translation() {
    return TRANSLATIONS[lang()];
  }

  function normalize(value) {
    return String(value || "")
      .replace(/[\u00a0\u202f]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function specialShipping(value) {
    const text = normalize(value);

    return SHIPPING_NAMES.some((name) => text.includes(normalize(name)));
  }

  function zeroPrice(value) {
    const text = String(value || "")
      .replace(/[\u00a0\u202f\s+*€]/g, "")
      .trim();

    return /^(0|0[,.]00)$/.test(text);
  }

  function createNote() {
    const t = translation();
    const note = document.createElement("div");

    note.className = NOTE_CLASS;

    const title = document.createElement("strong");
    title.className = "pe-transport-note__title";
    title.textContent = t.title;

    const message = document.createElement("span");
    message.className = "pe-transport-note__message";
    message.textContent = t.message;

    note.append(title, message);
    return note;
  }

  function updateNote(note) {
    const t = translation();

    const title = note.querySelector(".pe-transport-note__title");
    const message = note.querySelector(".pe-transport-note__message");

    if (title && title.textContent !== t.title) {
      title.textContent = t.title;
    }
    if (message && message.textContent !== t.message) {
      message.textContent = t.message;
    }
  }

  function updateValue(element, active) {
    if (!element) return;

    if (!active) {
      if (element.classList.contains(VALUE_CLASS)) {
        element.textContent = element.dataset.peOriginalValue || "0,00 €*";
        element.classList.remove(VALUE_CLASS);
        delete element.dataset.peOriginalValue;
      }
      return;
    }

    if (
      !zeroPrice(element.textContent) &&
      !element.classList.contains(VALUE_CLASS)
    ) {
      return;
    }

    if (!element.classList.contains(VALUE_CLASS)) {
      element.dataset.peOriginalValue = element.textContent;
    }

    element.classList.add(VALUE_CLASS);

    const text = translation().value;
    if (element.textContent !== text) {
      element.textContent = text;
    }
  }

  function syncNote(row, active, checkout = false) {
    let note = row.nextElementSibling;

    const exists = note?.classList.contains(NOTE_CLASS);

    if (!active) {
      if (exists) note.remove();
      return;
    }

    if (!exists) {
      note = createNote();

      if (checkout) {
        note.classList.add("pe-checkout-transport-note");
      } else {
        note.classList.add("pe-offcanvas-transport-note");
      }

      row.after(note);
    } else {
      updateNote(note);
    }
  }

  // OFFCANVAS
  function updateOffcanvas() {
    document.querySelectorAll(".offcanvas-shipping-info").forEach((row) => {
      const label = row.querySelector(".shipping-label");
      const value = row.querySelector(".shipping-value");

      if (!label || !value) return;

      const active = specialShipping(label.textContent);

      updateValue(value, active);
      syncNote(row, active);
    });
  }

  // CHECKOUT: ausgewählte Versandart
  function selectedShipping() {
    const checked = document.querySelectorAll('input[type="radio"]:checked');

    for (const input of checked) {
      const parent = input.closest(
        ".shipping-method, " +
          ".shipping-method-option, " +
          ".form-check, " +
          ".custom-control, " +
          ".confirm-shipping-method",
      );

      if (parent && specialShipping(parent.textContent)) {
        return true;
      }

      if (input.id) {
        const label = document.querySelector(
          `label[for="${CSS.escape(input.id)}"]`,
        );

        if (label && specialShipping(label.textContent)) {
          return true;
        }
      }
    }

    return false;
  }

  // CHECKOUT
  function updateCheckout() {
    const summary = document.querySelector(".checkout-aside-summary-list");

    if (!summary) return;

    const active = selectedShipping();

    const labels = summary.querySelectorAll("dt.checkout-aside-summary-label");

    const validLabels = Object.values(TRANSLATIONS).map((t) =>
      normalize(t.label),
    );

    labels.forEach((label) => {
      if (!validLabels.includes(normalize(label.textContent))) return;

      const value = label.nextElementSibling;

      if (!value?.matches("dd.checkout-aside-summary-value")) return;

      if (active) {
        const newLabel = translation().label;
        if (label.textContent !== newLabel) {
          label.textContent = newLabel;
        }
      }

      updateValue(value, active);

      // Hinweis direkt nach der Versandkostenzeile.
      // Checkout verwendet ein dl mit dt/dd.
      let note = value.nextElementSibling;

      const exists = note?.classList.contains(NOTE_CLASS);

      if (active && !exists) {
        note = createNote();
        note.classList.add("pe-checkout-transport-note");
        value.after(note);
      } else if (active && exists) {
        updateNote(note);
      } else if (!active && exists) {
        note.remove();
      }
    });
  }

  // Dynamische Shopware-Aktualisierungen
  let scheduled = false;

  function refresh() {
    if (scheduled) return;

    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;
      updateOffcanvas();
      updateCheckout();
    });
  }

  function init() {
    refresh();

    new MutationObserver(refresh).observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("change", refresh);
    document.addEventListener("click", refresh);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
