document.addEventListener("DOMContentLoaded", function () {
  const lang = document.documentElement.lang; // aktuelle Sprache
  let message = "";
  let dataCategory = "";

  switch (lang) {
    case "de-DE":
      message = "Solange der Vorrat reicht";
      dataCategory = "zum-alten-preis";
      break;
    case "fr-FR":
      message = "Dans la limite des stocks disponibles";
      dataCategory = "prix-précédent";
      break;
    case "en-GB":
      message = "While supplies last";
      dataCategory = "previous-price";
      break;
    default:
      return;
  }

  const body = document.querySelector(
    `body[data-category-name="${dataCategory}"]`,
  );
  if (!body) return;

  const productContainer = document.querySelector(
    ".cms-element-product-listing",
  );
  if (!productContainer) return;

  const alertElement = document.createElement("div");
  alertElement.textContent = message;

  alertElement.style.fontWeight = "bold";
  alertElement.style.fontSize = "x-large";
  alertElement.style.color = "red";
  alertElement.style.margin = "10px";

  productContainer.prepend(alertElement);
});
