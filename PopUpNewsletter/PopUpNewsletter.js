document.addEventListener("DOMContentLoaded", () => {
  // Prüfen, ob Popup schon gezeigt wurde
  if (sessionStorage.getItem("voucherPopupShown")) return;

  // Datum prüfen: nur zwischen 11.02.2026 und 15.02.2026 anzeigen
  const now = new Date();
  const startDate = new Date("2026-02-11T00:00:00");
  const endDate = new Date("2026-02-15T23:59:59");
  if (now < startDate || now > endDate) return;

  const lang = document.documentElement.lang || "en-GB";

  const texts = {
    "de-DE": {
      title: "<strong>Wichtige Preisinformation zu Keramikartikeln.</strong>",
      subheader: "",
      teaser: "",
      body: "EU-Antidumpingzoll auf Keramik aus China von 18 % auf 79 % erhöht.<br/><br/><strong>Bestellungen zum bisherigen Preis noch bis So., 15.02. – nur Lagerware.</strong> Ab Mo., 16.02. gelten neue Preise mit einer Steigerung  von 45 – 55 %.<br/><br/><strong>Diese Preisanpassung ist höhere Gewalt und liegt außerhalb unseres Einflusses.</strong>",
      cta: "Verstanden",
    },
    "fr-FR": {
      title:
        "<strong>Information importante concernant les prix des articles en céramique.</strong>",
      subheader: "",
      teaser: "",
      body: "Les droits antidumping de l’UE sur la céramique en provenance de Chine ont été relevés de 18 % à 79 %.<br/><br/> <strong>Vous pouvez encore passer vos commandes au tarif actuel jusqu’au 15.02.2026 inclus – uniquement pour les articles en stock</strong>. À partir du 16.02.2026, de nouveaux prix s’appliqueront, avec une hausse de 45 à 55 %.<br/><br/> <strong>Cet ajustement tarifaire constitue un cas de force majeure et échappe à notre contrôle.</strong>",
      cta: "Bien compris",
    },
    "en-GB": {
      title:
        "<strong>Important pricing information regarding ceramic items.</strong>",
      subheader: "",
      teaser: "",
      body: "EU anti-dumping duties on ceramics from China increased from 18% to 79%.<br/><br/> <strong>Orders at the previous price are still possible until Sun., Feb 15 – limited to items in stock. </strong>From Mon., Feb 16, new prices will apply with an increase of 45–55%.<br/><br/><strong>This price adjustment is due to force majeure and is beyond our control.</strong>",
      cta: "Got it",
    },
  };

  const t = texts[lang] || texts["en-GB"];

  let loginUrl = "";
  if (lang === "de-DE") loginUrl = "";
  if (lang === "fr-FR") loginUrl = "";
  if (lang === "en-GB") loginUrl = "";

  // Popup HTML
  const popup = document.createElement("div");
  popup.id = "voucher-popup";
  popup.innerHTML = `
      <div class="popup-overlay"></div>
      <div class="popup-content">
          <button class="close">&times;</button>
          <h2>${t.title}</h2>
          <h5>${t.subheader}</h5>
          <h5>${t.teaser}</h5>
          <p>${t.body}</p>
          <a href="${loginUrl}" class="cta">${t.cta}</a>
      </div>
      `;
  document.body.appendChild(popup);

  // Schließen mit Close-Button
  popup.querySelector(".close").addEventListener("click", () => {
    popup.remove();
  });

  // Schließen auch mit CTA-Button
  const ctaButton = popup.querySelector(".cta");
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault(); // Falls href gesetzt ist, nicht navigieren
      popup.remove();
    });
  }

  sessionStorage.setItem("voucherPopupShown", "true");
});
