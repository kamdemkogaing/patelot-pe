(function () {
  "use strict";

  const API_SAVE_URL =
    "https://test-tools.mrc-europe.com/v1/api/nav-click/save";
  const SESSION_STORAGE_KEY = "nav_tracking_session_id";

  function getDeviceType() {
    const width = window.innerWidth;

    if (width < 768) return "mobile";
    if (width < 992) return "tablet";
    return "desktop";
  }

  function getOrCreateSessionId() {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!sessionId) {
      sessionId =
        "sess_" + Math.random().toString(36).slice(2) + "_" + Date.now();
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }

    return sessionId;
  }

  function getNavLinks() {
    return Array.from(
      document.querySelectorAll(
        ".main-navigation-menu > a.nav-link.main-navigation-link",
      ),
    );
  }

  function getNavIndex(link) {
    const allLinks = getNavLinks();
    return allLinks.indexOf(link) + 1;
  }

  function getLinkText(link) {
    const textElement = link.querySelector('[itemprop="name"]');

    if (textElement && textElement.textContent.trim()) {
      return textElement.textContent.trim();
    }

    const title = link.getAttribute("title");
    if (title && title.trim()) {
      return title.trim();
    }

    return (link.textContent || "").trim();
  }

  function buildPayload(link) {
    const navText = getLinkText(link);
    const navTitle = (link.getAttribute("title") || navText || "").trim();
    const navUrl = (link.getAttribute("href") || "").trim();
    const navId = (link.getAttribute("id") || "").trim();
    const flyoutTrigger = (
      link.getAttribute("data-flyout-menu-trigger") || ""
    ).trim();

    return {
      nav_text: navText,
      nav_title: navTitle,
      nav_url: navUrl,
      nav_id: navId,
      flyout_trigger: flyoutTrigger,
      nav_index: getNavIndex(link),
      page_url: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title || "",
      device_type: getDeviceType(),
      menu_scope: "main_navigation",
      session_id: getOrCreateSessionId(),
      clicked_at: new Date().toISOString(),
    };
  }

  async function sendTracking(payload) {
    if (!payload.nav_text || !payload.nav_url) {
      console.warn(
        "Tracking abgebrochen: nav_text oder nav_url fehlt.",
        payload,
      );
      return;
    }

    try {
      const response = await fetch(API_SAVE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();
      console.log("Navigation Tracking erfolgreich:", data);
    } catch (error) {
      console.error("Navigation Tracking Fehler:", error);
    }
  }

  function handleClick(event) {
    const link = event.target.closest(
      ".main-navigation-menu > a.nav-link.main-navigation-link",
    );

    if (!link) {
      return;
    }

    const payload = buildPayload(link);
    sendTracking(payload);
  }

  function init() {
    document.addEventListener("click", handleClick);
    console.log("Navigation Tracking initialisiert");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
