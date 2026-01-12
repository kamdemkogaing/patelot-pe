document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const articleNumber = body.getAttribute("data-article-number");

  // Nur für diesen Artikel
  if (articleNumber !== "XT-BUNDLE-F2-UD-UV") return;

  const target = document.querySelector(".w_nostock_text");
  if (!target) return;

  // Sprache aus <html lang="">
  const lang = document.documentElement.lang || "de-DE";

  const translations = {
    "de-DE": "Ab 2026 lieferbar",
    "fr-FR": "Disponible à partir de 2026",
    "en-GB": "Available from 2026",
  };

  // Fallback Deutsch
  const text = translations[lang] || translations["de-DE"];

  target.textContent = text;
});
