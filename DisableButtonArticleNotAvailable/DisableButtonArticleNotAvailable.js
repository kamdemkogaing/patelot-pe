document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const articleNumber = body?.getAttribute("data-article-number");

  const disabledArticles = [
    "LENA-S",
    "LENA-F-AAA",
    "TTH-ST-AR",
    "TTH-ST-BO",
    "TTH-ST-CO",
    "TTH-R",
    "TTH-AR",
    "TTH-GY",
    "TTH-BO",
    "TTH-CO",
    "SPARK-SI",
    "TTH-LG",
    "RH-K",
    "RH-LG",
    "RH-ST-R",
    "LENA-ST-AAA",
  ];

  if (!disabledArticles.includes(articleNumber)) return;

  const lang = document.documentElement.lang || "de-DE";

  const buyButton = document.querySelector(".btn.btn-primary.btn-buy");

  if (!buyButton) return;

  let buttonText = "Artikel nicht verfügbar";

  if (lang === "fr-FR") buttonText = "Article pas disponible";
  if (lang === "en-GB") buttonText = "Article not available";

  buyButton.textContent = buttonText;
  buyButton.setAttribute("aria-label", buttonText);
  buyButton.setAttribute("title", buttonText);

  buyButton.disabled = true;

  buyButton.style.backgroundColor = "#ccc";
  buyButton.style.color = "#666";
  buyButton.style.borderColor = "#999";
  buyButton.style.cursor = "not-allowed";
  buyButton.style.pointerEvents = "none";
  buyButton.style.opacity = "0.6";
});
