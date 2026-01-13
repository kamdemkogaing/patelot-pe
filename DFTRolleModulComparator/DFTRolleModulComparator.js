document.addEventListener("DOMContentLoaded", function () {
  const cardTabs = document.querySelector(".product-detail-tabs .card-tabs");
  if (!cardTabs) return;

  const lang = document.documentElement.lang || "de-DE";

  const translations = {
    "de-DE": {
      features: [
        "Max. Medienbreite",
        "Spannungsversorgung Fixiereinheit",
        "Abmessungen (L x B x H)",
        "Druckgeschwindigkeit Produktionsmodus",
        "Empfohlenes Mindest-Produktionsvolumen",
      ],
      button: "MEHR ERFAHREN",
      products: [
        {
          imageText: "XP600-PRO, Fixiereinheit 450 mm",
          values: [
            "450 mm",
            "230 V AC (kein Starkstrom benötigt)",
            "1.330 x 525 x 435 mm (Druckbrücke), 1.330 x 750 x 1.415 mm (inkl. Standfuß), 2.350 x 770 x 965 mm (Fixiereinheit)",
            "14-15 lfm. / Std.(450 mm Filmbreite)",
            "25 lfm. / Woche, bei 2-3 Drucktagen / Woche",
          ],
          url: "https://shop.printequipment.de/dtf-system-bundle-xp600-pro-drucker-und-fixiereinheit-450-mm/DTF-XP-START-450",
        },
        {
          imageText: "XP600-PRO, Fixiereinheit 600mm",
          values: [
            "600 mm",
            "400 V AC",
            "1.330 x 525 x 435 mm (Druckbrücke), 1.330 x 750 x 1.415 mm (inkl. Standfuß), 2.350 x 1.025 x 1.075 mm (Fixiereinheit)",
            "11-12 lfm. / Std.(600 mm Filmbreite)",
            "50 lfm. / Woche, bei 2-3 Drucktagen / Woche",
          ],
          url: "https://shop.printequipment.de/dtf-drucksystem-xp600-pro-drucker-und-fixiereinheit-600-mm/DTF-XP-START-600",
        },
        {
          imageText: "XP600-PRO-4HD, Fixiereinheit 600 mm",
          values: [
            "600 mm",
            "400 V AC",
            "1.890 x 890 x 780 mm (Druckbrücke), 1.890 x 890 x 1.660 mm (inkl. Standfuß), 1.100 x 2.840 x 1.080 mm (Fixiereinheit)",
            "~25,6 lfm. / Std.(600 mm Filmbreite)",
            "50 lfm. / Tag, bei täglicher Produktion",
          ],
          url: "https://shop.printequipment.de/dtf-system-bundle-xp600-pro-4hd2-drucker-und-fixiereinheit-600-mm/DTF-XP-S-600-4HD2",
        },
      ],
    },
    // FR und EN Übersetzungen unverändert...
  };

  const t = translations[lang] || translations["de-DE"];

  const productImages = [
    "https://shop.printequipment.de/staging/media/aa/4d/3e/1765547954/DTF_XP_START_600.jpg?width=3000",
    "https://shop.printequipment.de/staging/media/aa/4d/3e/1765547954/DTF_XP_START_600.jpg?width=3000",
    "https://shop.printequipment.de/staging/media/aa/4d/3e/1765547954/DTF_XP_START_600.jpg?width=3000",
  ];

  const moduleWrapper = document.createElement("div");
  moduleWrapper.classList.add("product-compare-module");

  // Data-Attribut hinzufügen
  moduleWrapper.dataset.dtfRolle = "true";

  let html = `<div class="pcm-table"><div class="pcm-row pcm-header"><div class="pcm-cell"></div>`;

  // Produktbilder mit formatiertem Text aus translations.imageText
  productImages.forEach((img, i) => {
    let text = t.products[i].imageText;

    // Automatischer Zeilenumbruch nach Komma und Bindestrich
    let formattedText = text
      .replace(/, /g, ",<br>") // Komma → Zeilenumbruch
      .replace(/ - /g, " -<br>"); // Bindestrich → Zeilenumbruch

    html += `
      <div class="pcm-cell pcm-header-cell">
        <img src="${img}" alt="">
        <div class="product-text"><span class="title-text">${formattedText}</span></div>
      </div>
    `;
  });

  html += `</div>`;

  // Feature-Zeilen
  t.features.forEach((feature, index) => {
    const oddClass = index % 2 === 0 ? "pcm-odd" : "";
    html += `<div class="pcm-row ${oddClass}">
      <div class="pcm-cell pcm-feature">${feature}</div>`;
    t.products.forEach((product) => {
      html += `<div class="pcm-cell">${product.values[index]}</div>`;
    });
    html += `</div>`;
  });

  // Footer mit Buttons
  html += `<div class="pcm-row pcm-footer pcm-odd"><div class="pcm-cell"></div>`;
  t.products.forEach((product) => {
    html += `<div class="pcm-cell"><a class="pcm-btn" href="${product.url}">${t.button}</a></div>`;
  });
  html += `</div></div>`; // Ende Tabelle

  moduleWrapper.innerHTML = html;
  cardTabs.insertAdjacentElement("afterend", moduleWrapper);
});
