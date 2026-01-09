// 1. Body mit data-article-number prüfen
const body = document.body;
const articleNumber = body.dataset.articleNumber;

if (articleNumber && articleNumber.trim() !== "") {
  // 2. Prüfen, ob das gewünschte Div existiert
  const priceRequestDiv = document.querySelector(
    ".acris-price-on-request-button-container"
  );

  if (priceRequestDiv) {
    // 3. Referenz-Div für Einfügen finden
    const formContainer = document.querySelector(
      ".product-detail-form-container"
    );

    if (formContainer) {
      // 4. Neues Div mit Link erstellen
      const newDiv = document.createElement("div");
      newDiv.classList.add("d-grid-consultant"); // neue Klasse

      const newLink = document.createElement("a");
      newLink.href = "https://shop.printequipment.de/du-brauchst-hilfe";
      newLink.textContent = "JETZT BERATUNG ANFORDERN";
      newLink.classList.add("btn-light", "custom-btn");

      // Gewünschte Styles
      newLink.style.display = "inline-block";
      newLink.style.textAlign = "center";
      newLink.style.color = "white";
      newLink.style.paddingTop = "8px";
      newLink.style.paddingBottom = "8px";
      newLink.style.paddingLeft = "50px";
      newLink.style.paddingRight = "50px";
      newLink.style.borderRadius = "30px";
      newLink.style.fontWeight = "800";
      newLink.style.textTransform = "uppercase";
      newLink.style.textDecoration = "none";
      newLink.style.marginTop = "10px";

      newDiv.appendChild(newLink);

      // 5. Direkt nach formContainer einfügen
      formContainer.parentNode.insertBefore(newDiv, formContainer.nextSibling);

      // 6. Hover-Effekt + margin-bottom für neue Klasse
      const style = document.createElement("style");
      style.textContent = `
        .custom-btn:hover {
          color: black !important;
        }
        .d-grid-consultant {
          margin-bottom: 20px;
        }
      `;
      document.head.appendChild(style);
    }
  }
}
