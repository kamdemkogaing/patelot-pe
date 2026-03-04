document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.getAttribute("lang") || "de-DE";

  const cfg = {
    "de-DE": {
      href: "https://shop.printequipment.de/media/9b/a2/48/1772180055/2026_02_Rckgabe.pdf",
      text: "Zu den Reklamationsbedinungen",
      category: "reklamation",
    },
    "fr-FR": {
      href: "https://shop.printequipment.de/media/24/e6/7e/1772180055/2026_02_Retour.pdf",
      text: "LIRE LES CONDITIONS DE RÉCLAMATION",
      category: "réclamations",
    },
    "en-GB": {
      href: "https://shop.printequipment.de/media/d7/51/8e/1772180055/2026_02_Complaints.pdf",
      text: "About the complaint conditions",
      category: "complaints",
    },
  };

  const current = cfg[lang] || cfg["de-DE"];

  function patchPdfPrimaryLink() {
    const body = document.querySelector("body");

    // Prüfen, ob das body den richtigen data-category-name hat
    if (!body || body.getAttribute("data-category-name") !== current.category)
      return false;

    // Ziel-Link innerhalb des body
    const a =
      body.querySelector(
        'a.btn.btn-primary[href$=".pdf"], a.btn.btn-primary[href*=".pdf?"]',
      ) || body.querySelector("a.btn.btn-primary");

    if (!a) return false;

    if ((a.getAttribute("href") || "") !== current.href)
      a.setAttribute("href", current.href);
    if ((a.textContent || "").trim() !== current.text)
      a.textContent = current.text;

    a.setAttribute("aria-label", current.text);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    a.dataset.complaintsPatched = "1";

    return true;
  }

  // sofort
  patchPdfPrimaryLink();

  // MutationObserver für später hinzugefügte Links
  const obs = new MutationObserver(() => {
    if (patchPdfPrimaryLink()) obs.disconnect();
  });

  obs.observe(document.documentElement, { subtree: true, childList: true });

  // zur Sicherheit nach load auch nochmal
  window.addEventListener("load", patchPdfPrimaryLink);
});
