document.addEventListener("DOMContentLoaded", function () {
  const lang = document.documentElement.lang;

  const cols = document.querySelectorAll(
    ".pos-1 .web-kataloge .cms-block-container .cms-block-container-row.row .col-md-4",
  );

  if (!cols.length) return;

  // FR → letzte 2 ausblenden
  if (lang === "fr-FR") {
    for (let i = cols.length - 1; i >= cols.length - 2 && i >= 0; i--) {
      cols[i].style.display = "none";
    }
  }

  // EN → letzte 3 ausblenden (unverändert)
  else if (lang === "en-GB") {
    for (let i = cols.length - 1; i >= cols.length - 3 && i >= 0; i--) {
      cols[i].style.display = "none";
    }
  }

  // DE → nichts tun
});
