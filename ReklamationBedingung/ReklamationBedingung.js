(function () {
  const lang =
    document.body?.getAttribute("lang") ||
    document.documentElement.getAttribute("lang") ||
    "de-DE";

  const cfg = {
    "de-DE": {
      categoryName: "reklamation",
      href: "https://shop.printequipment.de/media/9b/a2/48/1772180055/2026_02_Rckgabe.pdf",
      text: "Zu den Reklamationsbedinungen",
      aria: "Zu den Reklamationsbedinungen",
    },
    "fr-FR": {
      categoryName: "réclamations",
      href: "https://shop.printequipment.de/media/24/e6/7e/1772180055/2026_02_Retour.pdf",
      text: "LIRE LES CONDITIONS DE RÉCLAMATION",
      aria: "LIRE LES CONDITIONS DE RÉCLAMATION",
    },
    "en-GB": {
      categoryName: "complaints",
      href: "https://shop.printequipment.de/media/d7/51/8e/1772180055/2026_02_Complaints.pdf",
      text: "About the complaint conditions",
      aria: "About the complaint conditions",
    },
  };

  const current = cfg[lang] || cfg["de-DE"];

  // Nur auf der richtigen Kategorie-Seite laufen
  function isRightCategory() {
    return !!document.body.querySelector(
      `[data-category-name="${CSS.escape(current.categoryName)}"]`,
    );
  }

  function apply() {
    console.log("Trying to apply ReklamationBedingung...");
    if (!isRightCategory()) return false;

    const form = document.body.querySelector("form");
    console.log("Form found:", !!form);
    if (!form) return false;

    // ✅ Direkt den ERSTEN <a class="btn btn-primary"> im Formular greifen
    const a = form.querySelector("a.btn.btn-primary");
    console.log("Button found:", !!a);
    if (!a) return false;

    // Nicht ständig überschreiben (optional)
    if (a.dataset.complaintsPatched === "1") return true;
    console.log("Patching the button...");

    a.href = current.href;
    a.textContent = current.text;
    a.setAttribute("aria-label", current.aria);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");

    a.dataset.complaintsPatched = "1";
    return true;
  }

  // 1) Sofort versuchen (falls DOM schon fertig)
  if (apply()) return;

  // 2) Sobald DOM ready, nochmal versuchen
  document.addEventListener("DOMContentLoaded", () => {
    if (apply()) return;
  });

  // 3) Beobachten, falls PixelForms später rendert
  const obs = new MutationObserver(() => {
    if (apply()) obs.disconnect();
  });

  obs.observe(document.body, { childList: true, subtree: true });
})();
