document.addEventListener("DOMContentLoaded", () => {
  const validArticles = [
    "SFS-BB-CB-3035",
    "SFS-SP3-BO-01",
    "SFS-SP3-CO-95Q",
    "SFS-SP3-KR-RE",
    "SFS-SP5-DH-01",
    "SFS-SP5-PF-02",
    "SFS-SP5-PP-05",
    "SFS-MH-BT24-58R",
  ];

  const body = document.body;
  const articleNumber = body?.getAttribute("data-article-number")?.trim();

  if (!validArticles.includes(articleNumber)) return;

  const descriptionText = document.querySelector(
    ".product-detail-description .product-detail-description-text",
  );

  if (!descriptionText) return;

  const lang = document.documentElement.lang || navigator.language;

  let url = "";
  let text = "";

  if (lang === "de-DE") {
    url =
      "https://shop.printequipment.de/media/af/8a/4e/1770811576/Anletung_Holzprodukte_Instructions for wood products_Instructions pour produits en bois.pdf";
    text = "Zur Anleitung";
  } else if (lang === "fr-FR") {
    url =
      "https://shop.printequipment.de/media/af/8a/4e/1770811576/Anletung_Holzprodukte_Instructions for wood products_Instructions pour produits en bois.pdf";
    text = "Pour les instructions";
  } else if (lang === "en-GB") {
    url =
      "https://shop.printequipment.de/media/af/8a/4e/1770811576/Anletung_Holzprodukte_Instructions for wood products_Instructions pour produits en bois.pdf";
    text = "For the instructions";
  } else {
    return;
  }

  // <p>
  const p = document.createElement("p");
  p.style.marginTop = "20px";

  // <a>
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", text);
  a.style.fontWeight = "700";
  a.style.display = "inline-flex";
  a.style.alignItems = "center";
  a.style.gap = "6px";
  a.style.textDecoration = "none"; // wichtig: kein underline auf dem ganzen Link

  // Text
  const strong = document.createElement("strong");
  strong.textContent = text;
  strong.style.textDecoration = "underline"; // nur Text unterstreichen

  // Pfeil
  const arrow = document.createElement("span");
  arrow.textContent = "→";
  arrow.setAttribute("aria-hidden", "true");
  arrow.style.textDecoration = "none"; // sicherstellen, dass kein underline kommt

  a.appendChild(strong);
  a.appendChild(arrow);
  p.appendChild(a);
  descriptionText.appendChild(p);
});
