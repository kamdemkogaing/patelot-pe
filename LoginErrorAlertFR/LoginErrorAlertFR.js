(function () {
  function replaceLoginErrorText() {
    const body = document.body;

    // Nur wenn nicht eingeloggt
    if (body.getAttribute("data-loggedin-status") !== "false") {
      return;
    }

    // Nur für FR
    if (document.documentElement.lang !== "fr-FR") {
      return;
    }

    const loginPopup = document.getElementById("login-popup");
    if (!loginPopup) return;

    const alertContent = loginPopup.querySelector(".alert-content");
    if (!alertContent) return;

    if (alertContent.textContent.includes("Es konnte kein Account")) {
      alertContent.textContent =
        "Aucun compte n'a pu être trouvé avec les identifiants indiqués.";
    }
  }

  // Initial prüfen
  document.addEventListener("DOMContentLoaded", replaceLoginErrorText);

  // Shopware AJAX / DOM Änderungen beobachten
  const observer = new MutationObserver(function () {
    replaceLoginErrorText();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
