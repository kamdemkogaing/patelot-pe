document.addEventListener("DOMContentLoaded", function () {
  const lang = document.documentElement.lang || "de-DE";

  const config = {
    "de-DE": {
      href: "https://shop.printequipment.de/keramikbecher-ohne-deckel-spuelmaschinengeeignet-hoehe-95-mm-12-st.-lage-36-st.-karton/PH-11-O",
      text: "Zum Becher",
    },
    "fr-FR": {
      href: "https://shop.printequipment.de/fr/pot-solide-en-ceramique-sans-couvercle-resistant-au-lave-vaiselle-hauteur-95-mm-12-pcs.-couche-36-pcs.-carton/PH-11-O",
      text: "Voir le mug",
    },
    "en-GB": {
      href: "https://shop.printequipment.de/en/ceramic-cup-without-lid-dishwasher-suitable-height-95-mm-12-pcs.-lay-36-pcs.-carton/PH-11-O",
      text: "View Mug",
    },
  };

  const current = config[lang];
  if (!current) return;

  // Alle Keen Slider durchsuchen
  document.querySelectorAll(".keen-slider").forEach((slider) => {
    const btnContainer = slider.querySelector(".desktop-only-btns-3");
    if (!btnContainer) return;

    // Verhindert mehrfaches Einfügen
    if (btnContainer.querySelector(".extra-mug-btn")) return;

    const newBtn = document.createElement("a");
    newBtn.className = "m-1 ms-1 btn btn-primary mt-4 extra-mug-btn";
    newBtn.href = current.href;
    newBtn.textContent = current.text;
    newBtn.title = current.text;

    btnContainer.appendChild(newBtn);
  });
});
