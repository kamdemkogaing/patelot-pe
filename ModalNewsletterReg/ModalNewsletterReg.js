document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "pe_register_success_pending";
  const debug = true;

  function log() {
    if (debug) console.log("[PE Modal]", ...arguments);
  }

  function markRegistrationStarted() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    log("Registrierung markiert");
  }

  function getRegistrationMark() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function clearRegistrationMark() {
    localStorage.removeItem(STORAGE_KEY);
    log("Registrierungs-Markierung gelöscht");
  }

  function hasFreshRegistrationMark(maxAgeMs) {
    const value = getRegistrationMark();
    if (!value) return false;

    const ts = parseInt(value, 10);
    if (isNaN(ts)) return false;

    const fresh = Date.now() - ts < maxAgeMs;
    log("Markierung gefunden:", fresh ? "frisch" : "zu alt", value);
    return fresh;
  }

  function getSuccessText() {
    const alerts = Array.from(
      document.querySelectorAll(
        ".alert-success, .flash-message-success, .alert.alert-success",
      ),
    );

    return alerts
      .map((el) => (el.textContent || "").trim().toLowerCase())
      .join(" | ");
  }

  function isRealAccountPage() {
    const path = location.pathname.toLowerCase();

    const hasAccountPath =
      path === "/account" ||
      path.endsWith("/account") ||
      path.includes("/account/profile") ||
      path.includes("/account/address") ||
      path.includes("/account/order");

    const hasCustomerNumber = document.body.innerText
      .toLowerCase()
      .includes("kundennummer");
    const hasLogoutLink = document.body.innerText
      .toLowerCase()
      .includes("abmelden");
    const hasOverview = document.body.innerText
      .toLowerCase()
      .includes("übersicht");
    const hasAccountNav =
      !!document.querySelector(".account-aside") ||
      !!document.querySelector(".account-menu") ||
      !!document.querySelector(".account-content") ||
      !!document.querySelector(".account-main");

    const hasLoginForm =
      !!document.querySelector('form[action*="/account/login"]') ||
      !!document.querySelector("form.login-form");

    const hasRegisterForm =
      !!document.querySelector('form[action*="/account/register"]') ||
      !!document.querySelector("form.register-form");

    const result =
      hasAccountPath &&
      (hasCustomerNumber || hasLogoutLink || hasOverview || hasAccountNav) &&
      !hasLoginForm &&
      !hasRegisterForm;

    log("isRealAccountPage:", result, {
      hasAccountPath,
      hasCustomerNumber,
      hasLogoutLink,
      hasOverview,
      hasAccountNav,
      hasLoginForm,
      hasRegisterForm,
    });

    return result;
  }

  function isLikelyRegistrationSuccess() {
    const successText = getSuccessText();
    const path = location.pathname.toLowerCase();

    log("pathname:", path);
    log("successText:", successText);

    // 1. Echte Account-Seite nach Redirect
    if (isRealAccountPage()) {
      return true;
    }

    // 2. Optionaler Fallback über Erfolgsnachricht
    const positiveHints = [
      "registrierung erfolgreich",
      "konto wurde erstellt",
      "kundenkonto wurde erstellt",
      "erfolgreich registriert",
      "bestätigungsmail",
      "bestätigungslink",
      "aktivieren",
    ];

    const negativeHints = [
      "erfolgreich abgemeldet",
      "abgemeldet",
      "passwort",
      "zurückgesetzt",
    ];

    const hasPositive = positiveHints.some((hint) =>
      successText.includes(hint),
    );
    const hasNegative = negativeHints.some((hint) =>
      successText.includes(hint),
    );

    if (hasPositive && !hasNegative) {
      return true;
    }

    return false;
  }

  function createNewsletterModal() {
    if (document.querySelector(".pe-newsletter-modal-overlay")) {
      log("Modal bereits vorhanden");
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "pe-newsletter-modal-overlay";
    overlay.innerHTML = `
            <div class="pe-newsletter-modal" role="dialog" aria-modal="true" aria-labelledby="pe-newsletter-title">
                <button class="pe-newsletter-modal-close" type="button" aria-label="Popup schließen">&times;</button>

                <div class="pe-newsletter-modal-content">
                    <h2 id="pe-newsletter-title">Vielen Dank für Deine Anmeldung!</h2>
                    <p>Bleibe immer up to date und melde Dich jetzt kostenfrei bei unserem Newsletter an.</p>
                    <p>Aktuelle Aktionen, Neuheiten &amp; Verfügbarkeiten – direkt in Deinem Postfach!</p>

                    <a href="https://shop.printequipment.de/newsletter/" class="pe-newsletter-modal-button">
                        Jetzt anmelden
                    </a>
                </div>
            </div>
        `;

    document.body.appendChild(overlay);
    document.body.classList.add("pe-newsletter-modal-open");
    log("Modal angezeigt");

    function closeModal() {
      overlay.remove();
      document.body.classList.remove("pe-newsletter-modal-open");
      log("Modal geschlossen");
    }

    const closeBtn = overlay.querySelector(".pe-newsletter-modal-close");
    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escHandler);
      }
    });
  }

  // Registrierung beim Absenden merken
  document.addEventListener(
    "submit",
    function (e) {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;

      if (
        form.matches('form.register-form[action*="/account/register"]') ||
        form.action.indexOf("/account/register") !== -1
      ) {
        markRegistrationStarted();
        log("Submit vom Registrierungsformular erkannt");
      }
    },
    true,
  );

  // Fallback auf Klick des Buttons
  document.addEventListener(
    "click",
    function (e) {
      const btn = e.target.closest('button, input[type="submit"]');
      if (!btn) return;

      const form = btn.form || btn.closest("form");
      if (!form) return;

      if (
        form.matches('form.register-form[action*="/account/register"]') ||
        form.action.indexOf("/account/register") !== -1
      ) {
        markRegistrationStarted();
        log("Klick auf Registrierungs-Submit erkannt");
      }
    },
    true,
  );

  // Nach Redirect / Seitenwechsel prüfen
  if (
    hasFreshRegistrationMark(10 * 60 * 1000) &&
    isLikelyRegistrationSuccess()
  ) {
    clearRegistrationMark();

    window.setTimeout(function () {
      createNewsletterModal();
    }, 700);
  }
});
