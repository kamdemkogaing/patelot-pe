document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const articleNumber = body.getAttribute("data-article-number");

  // Nur für diese Artikel
  const allowedArticles = ["XT-BUNDLE-F2-UD-UV", "XT-BUNDLE-F2-CO-UV"];
  if (!allowedArticles.includes(articleNumber)) return;

  // Sprache aus <html lang="">
  const lang = document.documentElement.lang || "de-DE";

  /* ----------------------------
       Lieferhinweis Text
    ---------------------------- */
  const stockTarget = document.querySelector(".w_nostock_text");
  if (stockTarget) {
    const stockTranslations = {
      "de-DE":
        "Jetzt schon vorbestellen – bei Verfügbarkeit in Abhängigkeit der Bestellreihenfolge erhalten. (Lieferzeit auf Anfrage).",
      "fr-FR":
        "Précommandez dès maintenant – la disponibilité sera attribuée selon l’ordre des commandes. (Délai de livraison sur demande).",
      "en-GB":
        "Pre-order now – availability will be granted according to the order of purchase. (Delivery time upon request).",
    };

    stockTarget.textContent =
      stockTranslations[lang] || stockTranslations["de-DE"];
  }

  /* ----------------------------
       Button Text
    ---------------------------- */
  const buyButton = document.querySelector(".btn.btn-primary.btn-buy");
  if (buyButton) {
    const buttonTranslations = {
      "de-DE": "Jetzt vorbestellen",
      "fr-FR": "Précommander maintenant",
      "en-GB": "Pre-order now",
    };

    const buttonText = buttonTranslations[lang] || buttonTranslations["de-DE"];

    buyButton.textContent = buttonText;
    buyButton.setAttribute("aria-label", buttonText);
    buyButton.setAttribute("title", buttonText);
  }
});
