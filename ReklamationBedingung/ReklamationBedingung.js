document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.getAttribute("lang") || "de-DE";

  const cfg = {
    "de-DE": {
      href: "https://shop.printequipment.de/media/9b/a2/48/1772180055/2026_02_Rckgabe.pdf",
      text: "Zu den Reklamationsbedinungen",
    },
    "fr-FR": {
      href: "https://shop.printequipment.de/media/24/e6/7e/1772180055/2026_02_Retour.pdf",
      text: "LIRE LES CONDITIONS DE RÉCLAMATION",
    },
    "en-GB": {
      href: "https://shop.printequipment.de/media/d7/51/8e/1772180055/2026_02_Complaints.pdf",
      text: "About the complaint conditions",
    },
  };

  const current = cfg[lang] || cfg["de-DE"];

  function patchPdfPrimaryLink() {
    // ✅ Ziel: primary link, der zu einer PDF führt (oder führen soll)
    const a =
      document.querySelector(
        'a.btn.btn-primary[href$=".pdf"], a.btn.btn-primary[href*=".pdf?"]',
      ) || document.querySelector("a.btn.btn-primary");

    if (!a) return false;

    // stabiler Vergleich über Attribute
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

  // Pixforms rendert später -> warten bis Link existiert, dann patchen
  const obs = new MutationObserver(() => {
    if (patchPdfPrimaryLink()) obs.disconnect(); // ✅ wenn erfolgreich, stop
  });

  obs.observe(document.documentElement, { subtree: true, childList: true });

  // zur Sicherheit nach load auch nochmal
  window.addEventListener("load", patchPdfPrimaryLink);
});
