document.addEventListener("DOMContentLoaded", function () {
  /* 1. Sprache prüfen */
  const lang = document.documentElement.lang;
  if (lang !== "fr-FR") return;

  /* 2. Login-Seite prüfen */
  if (!window.location.pathname.includes("login")) return;

  /* 3. w_showroom Container suchen */
  const showroom = document.querySelector(".w_showroom");
  if (!showroom) return;

  /* 4. h5 Text ersetzen */
  const h5 = showroom.querySelector("h5");
  if (h5) {
    h5.textContent = "Démonstrations de showroom en ligne";
  }

  /* 5. Bild ersetzen */
  const img = showroom.querySelector("img");
  if (img) {
    img.src =
      "https://shop.printequipment.de/media/c1/c4/bd/1768566915/Calendly_FR.jpg?width=2400";
  }

  /* 6. description TEXT setzen (ohne Link zu löschen) */
  const description = showroom.querySelector(".description");
  if (description) {
    /* Text vor dem Link ändern */
    const textNode = description.childNodes[0];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent =
        "Découvrez nos systèmes d’impression lors d’une démonstration de showroom en ligne gratuite via Microsoft Teams – flexible, accompagnée de manière personnalisée et sans aucun déplacement.";
    }

    /* <a> Tag innerhalb von description suchen */
    const link = description.querySelector("a");
    if (link) {
      link.setAttribute("href", "https://calendly.com/team-france/");
      link.setAttribute("target", "_blank"); // optional
      link.setAttribute("rel", "noopener noreferrer"); // optional
    }
  }
});
