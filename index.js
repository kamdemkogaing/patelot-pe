// 1. Body per Attribut-Selektor auswählen
const bodyEl = document.querySelector('body[data-article-number="DMN-4-44"]');

// 2. Allgemein: Body greifen & Attribut auslesen
const bodyEl2 = document.body;
const articleNumber = bodyE2.dataset.articleNumber;

console.log(articleNumber); // "DMN-4-44"

// 3. Prüfen auf bestimmte Artikelnummer
if (document.body.dataset.articleNumber === "DMN-4-44") {
  console.log("Artikel erkannt!");
}

// 4. Alle Elemente mit data-article-number suchen
const elements = document.querySelectorAll("[data-article-number]");
