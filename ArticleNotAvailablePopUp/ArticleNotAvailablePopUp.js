document.addEventListener("DOMContentLoaded", function () {
  // Prüfen, ob body ein data-article-number besitzt
  const body = document.querySelector("body[data-article-number]");
  if (!body) return;

  // Aktuelle Sprache erkennen
  const lang = document.documentElement.lang || "de-DE";

  // Texte für alle Sprachen
  const translations = {
    "de-DE": {
      title: "Artikel nicht auf Lager",
      text: `Der Artikel: <strong class="article-number"></strong> ist derzeit nicht im Lager.<br>
                   Du kannst ihn trotzdem bestellen. Sobald er wieder verfügbar ist,
                   wird er sofort geliefert.`,
    },
    "fr-FR": {
      title: "Article en rupture de stock",
      text: `L'article : <strong class="article-number"></strong> n'est actuellement pas en stock.<br>
                   Vous pouvez néanmoins le commander. Dès qu’il sera de nouveau disponible,
                   il sera expédié immédiatement.`,
    },
    "en-GB": {
      title: "Item out of stock",
      text: `The item: <strong class="article-number"></strong> is currently out of stock.<br>
                   You can still place an order. As soon as it becomes available again,
                   it will be shipped immediately.`,
    },
  };

  const t = translations[lang] || translations["de-DE"];

  // Artikelnummer dynamisch holen
  const articleNumber = body.getAttribute("data-article-number");

  // Prüfen, ob "nicht auf Lager" Element existiert
  const outOfStockElement = document.querySelector(".w_not_available_stock");
  if (!outOfStockElement) return;

  // Warenkorb-Button suchen
  const buyButton = document.querySelector(".btn-buy");
  if (!buyButton) return;

  // Popup Overlay erzeugen (mit dynamischer Artikelnummer)
  const overlay = document.createElement("div");
  overlay.id = "stock-popup-overlay";
  overlay.style.display = "none";

  overlay.innerHTML = `
        <div id="stock-popup">
            <span id="stock-popup-close">&times;</span>
            <h3 style="margin-bottom: 10px;">${t.title}</h3>
            <p>${t.text}</p>
        </div>
    `;

  document.body.appendChild(overlay);

  // Artikelnummer einsetzen
  overlay.querySelector(".article-number").textContent = articleNumber;

  // Popup nur einmal anzeigen
  let popupShown = false;

  buyButton.addEventListener("click", function () {
    if (!popupShown) {
      overlay.style.display = "flex";
      popupShown = true;
    }
  });

  // Popup schließen über X
  document
    .getElementById("stock-popup-close")
    .addEventListener("click", function () {
      overlay.style.display = "none";
    });

  // Popup schließen durch Klick außerhalb
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
});
