document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const articleNumber = body.getAttribute("data-article-number");

  // Nur für diese Artikel
  const allowedArticles = ["MRSOCK-BUNDLE-M", "MRSOCK-BUNDLE-L"];
  if (!allowedArticles.includes(articleNumber)) return;

  // Sprache aus <html lang="">
  const lang = document.documentElement.lang || "de-DE";

  /* ----------------------------
       Lieferhinweis Text
    ---------------------------- */
  const stockTarget = document.querySelector(".w_nostock_text");
  if (stockTarget) {
    const stockTranslations = {
      "de-DE": "Artikel verfügbar.",
      "fr-FR": "Article disponible.",
      "en-GB": "Item available.",
    };

    stockTarget.textContent =
      stockTranslations[lang] || stockTranslations["de-DE"];
  }
});
