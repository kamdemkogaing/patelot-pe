document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "pe_register_success_pending";

  function getCurrentLanguage() {
    const htmlLang = (document.documentElement.lang || "de-DE").toLowerCase();

    if (htmlLang.startsWith("fr")) return "fr";
    if (htmlLang.startsWith("en")) return "en";
    return "de";
  }

  function getLanguageConfig() {
    const lang = getCurrentLanguage();

    const translations = {
      de: {
        accountTexts: {
          customerNumber: "kundennummer",
          logout: "abmelden",
          overview: "übersicht",
        },
        positiveHints: [
          "registrierung erfolgreich",
          "konto wurde erstellt",
          "kundenkonto wurde erstellt",
          "erfolgreich registriert",
          "bestätigungsmail",
          "bestätigungslink",
          "aktivieren",
        ],
        negativeHints: [
          "erfolgreich abgemeldet",
          "abgemeldet",
          "passwort",
          "zurückgesetzt",
        ],
        modal: {
          title: "Vielen Dank für Deine Anmeldung!",
          text1:
            "Bleibe immer up to date und melde Dich jetzt <strong>kostenfrei</strong> bei unserem Newsletter an.",
          text2:
            "Aktuelle Aktionen, Neuheiten & Verfügbarkeiten – direkt in Deinem Postfach!",
          button: "Jetzt anmelden",
          closeLabel: "Popup schließen",
          url: "https://shop.printequipment.de/newsletter/",
        },
      },
      fr: {
        accountTexts: {
          customerNumber: "numéro client",
          logout: "déconnectez-vous",
          overview: "aperçu",
        },
        positiveHints: [
          "inscription réussie",
          "compte créé",
          "votre compte a été créé",
          "enregistré avec succès",
          "e-mail de confirmation",
          "lien de confirmation",
          "activer",
        ],
        negativeHints: [
          "déconnecté avec succès",
          "déconnectez-vous",
          "mot de passe",
          "réinitialisé",
        ],
        modal: {
          title: "Merci beaucoup pour votre inscription !",
          text1:
            "Restez toujours informé et inscrivez-vous <strong>gratuitement</strong> à notre newsletter dès maintenant.",
          text2:
            "Promotions en cours, nouveautés et disponibilités – directement dans votre boîte mail !",
          button: "S’inscrire maintenant",
          closeLabel: "Fermer la fenêtre",
          url: "https://shop.printequipment.de/fr/newsletter/",
        },
      },
      en: {
        accountTexts: {
          customerNumber: "customer id",
          logout: "log out",
          overview: "overview",
        },
        positiveHints: [
          "registration successful",
          "account has been created",
          "customer account has been created",
          "successfully registered",
          "confirmation email",
          "confirmation link",
          "activate",
        ],
        negativeHints: [
          "successfully logged out",
          "logged out",
          "password",
          "reset",
        ],
        modal: {
          title: "Thank you for signing up!",
          text1:
            "Stay up to date and subscribe to our newsletter <strong>free of charge</strong> now.",
          text2:
            "Current promotions, new products & availability updates – straight to your inbox!",
          button: "Sign up now",
          closeLabel: "Close popup",
          url: "https://shop.printequipment.de/en/newsletter/",
        },
      },
    };

    return translations[lang];
  }

  function markRegistrationStarted() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }

  function getRegistrationMark() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function clearRegistrationMark() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function hasFreshRegistrationMark(maxAgeMs) {
    const value = getRegistrationMark();
    if (!value) return false;

    const ts = parseInt(value, 10);
    if (isNaN(ts)) return false;

    return Date.now() - ts < maxAgeMs;
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
    const pageText = (document.body.innerText || "").toLowerCase();
    const config = getLanguageConfig();

    const hasAccountPath =
      path === "/account" ||
      path.endsWith("/account") ||
      path.includes("/account/profile") ||
      path.includes("/account/address") ||
      path.includes("/account/order") ||
      path.includes("/fr/account") ||
      path.includes("/en/account");

    const hasCustomerNumber = pageText.includes(
      config.accountTexts.customerNumber.toLowerCase(),
    );
    const hasLogoutLink = pageText.includes(
      config.accountTexts.logout.toLowerCase(),
    );
    const hasOverview = pageText.includes(
      config.accountTexts.overview.toLowerCase(),
    );

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

    return (
      hasAccountPath &&
      (hasCustomerNumber || hasLogoutLink || hasOverview || hasAccountNav) &&
      !hasLoginForm &&
      !hasRegisterForm
    );
  }

  function isLikelyRegistrationSuccess() {
    const successText = getSuccessText();
    const config = getLanguageConfig();

    if (isRealAccountPage()) {
      return true;
    }

    const hasPositive = config.positiveHints.some((hint) =>
      successText.includes(hint.toLowerCase()),
    );
    const hasNegative = config.negativeHints.some((hint) =>
      successText.includes(hint.toLowerCase()),
    );

    return hasPositive && !hasNegative;
  }

  function createNewsletterModal() {
    if (document.querySelector(".pe-newsletter-modal-overlay")) {
      return;
    }

    const config = getLanguageConfig();

    const overlay = document.createElement("div");
    overlay.className = "pe-newsletter-modal-overlay";
    overlay.innerHTML = `
      <div class="pe-newsletter-modal" role="dialog" aria-modal="true" aria-labelledby="pe-newsletter-title">
        <button class="pe-newsletter-modal-close" type="button" aria-label="${config.modal.closeLabel}">&times;</button>

        <div class="pe-newsletter-modal-content">
          <h2 id="pe-newsletter-title">${config.modal.title}</h2>
          <p>${config.modal.text1}</p>
          <p>${config.modal.text2}</p>

          <a href="${config.modal.url}" class="pe-newsletter-modal-button">
            ${config.modal.button}
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.classList.add("pe-newsletter-modal-open");

    function closeModal() {
      overlay.remove();
      document.body.classList.remove("pe-newsletter-modal-open");
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
      }
    },
    true,
  );

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
      }
    },
    true,
  );

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
