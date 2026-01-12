// 1. Body mit data-article-number prüfen
const body = document.body;
const articleNumber = body.dataset.articleNumber;

if (articleNumber && articleNumber.trim() !== "") {
  // 2. Preis-anfragen-Container suchen
  const priceRequestDiv = document.querySelector(
    ".acris-price-on-request-button-container"
  );

  if (priceRequestDiv) {
    // 3. Prüfen, ob das Element sichtbar ist
    const isVisible = (el) => {
      return !!(
        el.offsetWidth ||
        el.offsetHeight ||
        el.getClientRects().length
      );
    };

    // 4. Prüfen, ob es in einer .product-action mit display:none liegt
    const productAction = priceRequestDiv.closest(".product-action");
    const isHiddenByProductAction =
      productAction &&
      window.getComputedStyle(productAction).display === "none";

    // 5. Finale Bedingung
    if (isVisible(priceRequestDiv) && !isHiddenByProductAction) {
      const formContainer = document.querySelector(
        ".product-detail-form-container"
      );

      if (formContainer) {
        /* ===============================
           Sprachlogik
        =============================== */

        const lang = document.documentElement.lang;

        const langConfig = {
          "de-DE": {
            url: "https://shop.printequipment.de/du-brauchst-hilfe",
            text: "JETZT BERATUNG ANFORDERN",
          },
          "fr-FR": {
            url: "https://shop.printequipment.de/fr/du-brauchst-hilfe",
            text: "DEMANDER CONSEIL",
          },
          "en-GB": {
            url: "https://shop.printequipment.de/en/du-brauchst-hilfe",
            text: "REQUEST CONSULTATION",
          },
        };

        // Fallback: Deutsch
        const { url, text } = langConfig[lang] || langConfig["de-DE"];

        /* ===============================
           Button erstellen
        =============================== */

        const newDiv = document.createElement("div");
        newDiv.classList.add("d-grid-consultant");

        const newLink = document.createElement("a");
        newLink.href = url;
        newLink.textContent = text;
        newLink.classList.add("btn-light", "custom-btn");

        Object.assign(newLink.style, {
          display: "inline-block",
          textAlign: "center",
          color: "white",
          padding: "8px 50px",
          borderRadius: "30px",
          fontWeight: "800",
          textTransform: "uppercase",
          textDecoration: "none",
          marginTop: "10px",
        });

        newDiv.appendChild(newLink);
        formContainer.parentNode.insertBefore(
          newDiv,
          formContainer.nextSibling
        );

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
}
