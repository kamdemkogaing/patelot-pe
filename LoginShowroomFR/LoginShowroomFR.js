document.addEventListener("DOMContentLoaded", function () {
  /* 1. Prüfen, ob Sprache fr-FR ist */
  const lang = document.documentElement.lang;
  if (lang !== "fr-FR") return;

  /* 2. Prüfen, ob Seite "login" ist (URL enthält /login) */
  if (!window.location.pathname.includes("login")) return;

  /* 3. w_showroom Container suchen */
  const showroom = document.querySelector(".w_showroom");
  if (!showroom) return;

  /* 4. <h5> Text setzen */
  const h5 = showroom.querySelector("h5");
  if (h5) {
    h5.textContent = "Reserver un rendez-vous";
  }

  /* 5. Image src ersetzen */
  const img = showroom.querySelector("img");
  if (img) {
    img.src =
      "https://printequipment.dev.wizmo.cloud/media/97/62/b1/1720019325/w-Showroom.jpg";
  }

  /* 6. Text in .description ersetzen */
  const description = showroom.querySelector(".description");
  if (description) {
    description.textContent = "patrick kamdem Printenquipment TEST";
  }

  /* 7. href im <a> Tag ersetzen */
  const link = showroom.querySelector("a");
  if (link) {
    link.href = "https://patelot.de";
  }
});
