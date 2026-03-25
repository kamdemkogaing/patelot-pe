document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const articleNumber = body.getAttribute("data-article-number");

  // Nur für diese Artikel
  const allowedArticles = ["L-MIKE-K", "L-MIKE-GR", "TOM-R"];
  if (!allowedArticles.includes(articleNumber)) return;

  // Sprache aus <html lang="">
  const lang = document.documentElement.lang || "de-DE";

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
