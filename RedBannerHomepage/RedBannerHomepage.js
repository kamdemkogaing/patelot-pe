// 1. Texte pro Sprache definieren
const messages = {
  "de-DE": `Ab dem 23.12.2025 um 12:00 Uhr befinden wir uns in der Betriebsruhe. Unser Onlineshop bleibt geöffnet, der Versand startet wieder am 05.01.2026.`,
  "en-GB": `From December 23rd, 2025 at 12:00 PM, we will be closed due to company holidays. Our online shop remains open, and shipping will resume on January 5th, 2026.`,
  "fr-FR": `À partir du 23 décembre 2025 à 12h00, nous serons en fermeture annuelle. Notre boutique en ligne reste ouverte et les expéditions reprendront à partir du 5 janvier 2026.`,
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
  ".swag-custom-notification-banner-close-icon"
);
if (closeButton) {
  closeButton.addEventListener("click", () => {
    banner.style.display = "none"; // Banner ausblenden
  });
}
