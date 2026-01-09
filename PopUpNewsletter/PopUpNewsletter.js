document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Prüfen, ob Popup schon gezeigt wurde
    if (sessionStorage.getItem("voucherPopupShown")) return;

    // Datum prüfen: nur zwischen 15.09.2025 und 12.10.2025 anzeigen
    const now = new Date();
    const startDate = new Date("2025-09-15T00:00:00");
    const endDate = new Date("2025-10-12T23:59:59");
    if (now < startDate || now > endDate) return;

    const lang = document.documentElement.lang || "en-GB";

    const texts = {
      "de-DE": {
        title: "🎁 Dein 5€ Gutschein wartet!",
        subheader:
          "Melde Dich jetzt zu unserem Newsletter an und erhalte einen 5€ Shop-Gutschein!",
        teaser: "Preisvorteile, News und Eventtermine zuerst erfahren!",
        body: "Gültig von 15.09. bis 12.10.25 und ab einem Bestellwert von 75 €.",
        cta: "Jetzt anmelden",
      },
      "fr-FR": {
        title: "🎁 Votre bon de 5 € vous attend !",
        subheader:
          "Inscrivez-vous dès maintenant à notre newsletter et recevez un bon d’achat de 5 € !",
        teaser:
          "Soyez les premiers informés des avantages, actualités et dates d’événements !",
        body: "Valable du 15.09. au 12.10.2025 pour toute commande d’un montant minimum de 75 €.",
        cta: "Inscrivez-vous maintenant",
      },
      "en-GB": {
        title: "🎁 Your €5 voucher is waiting!",
        subheader:
          "Sign up for our newsletter now and receive a 5€ shop voucher!",
        teaser:
          "Be the first to hear about special offers, news, and event dates!",
        body: "Valid from 15.09. to 12.10.2025 with a minimum order value of 75€.",
        cta: "Sign up now",
      },
    };

    const t = texts[lang] || texts["en-GB"];

    let loginUrl = "";
    if (lang === "de-DE")
      loginUrl =
        "https://shop.printequipment.de/newsletter/?utm_campaign=nlg&utm_medium=o&utm_source=pu&utm_term=20250915";
    if (lang === "fr-FR")
      loginUrl =
        "https://shop.printequipment.de/fr/newsletter/?utm_campaign=nlg&utm_medium=o&utm_source=pu&utm_term=20250915";
    if (lang === "en-GB")
      loginUrl =
        "https://shop.printequipment.de/en/newsletter/?utm_campaign=nlg&utm_medium=o&utm_source=pu&utm_term=20250915";

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

    // Schließen
    popup.querySelector(".close").addEventListener("click", () => {
      popup.remove();
    });

    sessionStorage.setItem("voucherPopupShown", "true");
  }, 5000); // 5 Sekunden
});
