// 1. Texte pro Sprache definieren
const messages = {
  "de-DE": `Aufgrund des erhöhten Bestellaufkommens kann es derzeit zu Verzögerungen kommen. Wir bitten um Dein Verständnis!`,
  "en-GB": `Due to high order volumes, there may currently be delays. We kindly ask for your understanding!`,
  "fr-FR": `En raison d’un volume de commandes élevé, des retards peuvent actuellement survenir. Nous vous remercions de votre compréhension !`,
};

// 2. Aktuelle Sprache ermitteln
const lang = document.documentElement.lang || "de-DE";
const messageText = messages[lang] || messages["de-DE"];

// 3. Neues Banner-DIV erstellen
const banner = document.createElement("div");
banner.className = "swag-custom-notification-banner";
banner.style.backgroundColor = "#cccccc";
banner.style.color = "#000000";
banner.innerHTML = `
  <span class="swag-custom-notification-banner-text">
    ${messageText}
  </span>
  <span class="swag-custom-notification-banner-close-icon icon icon-x icon-xs" style="color:#000000; cursor:pointer;">
    ×
  </span>
`;

// 4. Referenz-DIV finden (w_header-usp-bar)
const referenceDiv = document.querySelector(".w_header-usp-bar");

// 5. Banner direkt davor einfügen
if (referenceDiv) {
  referenceDiv.parentNode.insertBefore(banner, referenceDiv);
}

// 6. Schließen-Button funktional machen
const closeButton = banner.querySelector(
  ".swag-custom-notification-banner-close-icon",
);
if (closeButton) {
  closeButton.addEventListener("click", () => {
    banner.style.display = "none"; // Banner ausblenden
  });
}
