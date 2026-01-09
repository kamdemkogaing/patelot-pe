document.addEventListener("DOMContentLoaded", function () {
  const privacyTexts = {
    "de-DE": {
      text: "Ich habe die Datenschutzbestimmungen gelesen und erkenne diese ausdrücklich an.",
      url: "https://shop.printequipment.de/rechtliches/datenschutz/",
    },
    "en-GB": {
      text: "I have read the privacy policy and expressly acknowledge it.",
      url: "https://shop.printequipment.de/en/information/data-protection/",
    },
    "fr-FR": {
      text: "J’ai lu la politique de confidentialité et je l’accepte.",
      url: "https://shop.printequipment.de/fr/informations/protection-des-donnees/",
    },
  };

  const lang = document.documentElement.lang || "de-DE";

  function updatePrivacyBlocks() {
    const blocks = document.querySelectorAll(".checkbox-inline");

    if (blocks.length === 0) {
      return false; // Noch nicht vorhanden
    }

    blocks.forEach((block) => {
      if (block.dataset.processed === "1") return;

      const label = block.querySelector("label");
      if (!label) return;

      const { text, url } = privacyTexts[lang];

      // Link mit title + aria-label
      label.innerHTML = `
        <a href="${url}" 
           target="_blank" 
           title="${text}" 
           aria-label="${text}">
           ${text}
        </a>
      `;

      block.dataset.processed = "1";
    });

    return true;
  }

  const check = setInterval(function () {
    if (updatePrivacyBlocks()) {
      clearInterval(check);
    }
  }, 100);
});
