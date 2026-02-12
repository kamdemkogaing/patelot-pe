document.addEventListener("DOMContentLoaded", function () {
  // Prüfen, ob <body> das data-Attribut hat
  const body = document.querySelector(
    'body[data-category-name="zum-alten-preis"]',
  );
  if (!body) return; // Wenn nicht, Script beenden

  // Container mit der Klasse finden
  const productContainer = document.querySelector(
    ".cms-element-product-listing",
  );
  if (!productContainer) return; // Wenn nicht vorhanden, Script beenden

  // Text je nach Sprache
  let message = "";
  switch (
    document.documentElement.lang // Oder body.lang falls vorhanden
  ) {
    case "de-DE":
      message = "Solange der Vorrat reicht";
      break;
    case "fr-FR":
      message = "Si stock disponible";
      break;
    case "en-GB":
      message = "When stock available";
      break;
    default:
      message = ""; // Keine Anzeige, wenn Sprache nicht matcht
  }

  if (message) {
    // Neues Element erstellen und an die erste Stelle einfügen
    const alertElement = document.createElement("div");
    alertElement.textContent = message;
    alertElement.style.fontWeight = "bold"; // optional, damit es auffällt
    productContainer.prepend(alertElement);
  }
});
