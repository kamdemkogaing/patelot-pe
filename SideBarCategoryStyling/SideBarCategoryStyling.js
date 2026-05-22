(function () {
  window.dataLayer = window.dataLayer || [];

  document.addEventListener(
    "click",
    function (e) {
      var link = e.target.closest("a");
      if (!link) return;

      var inMainNav = link.closest(".nav-main");
      var inFlyout = link.closest(".navigation-flyouts");
      var inFlyoutSingle = link.closest(".navigation-flyout");

      if (!inMainNav && !inFlyout && !inFlyoutSingle) return;

      var url = link.href;
      if (!url) return;

      var isNewTab =
        e.ctrlKey || e.metaKey || e.shiftKey || link.target === "_blank";

      var menuLevel = "unknown";

      if (link.classList.contains("main-navigation-link")) {
        menuLevel = "main";
      } else if (link.closest(".submenu-vertical-element")) {
        menuLevel = "submenu";
      } else if (inFlyoutSingle) {
        menuLevel = "flyout";
      }

      var parentCategory = "";
      var flyout = link.closest(".navigation-flyout");

      if (flyout) {
        var flyoutId = flyout.getAttribute("data-flyout-menu-id");
        var trigger = document.querySelector(
          '[data-flyout-menu-trigger="' + flyoutId + '"]',
        );

        if (trigger) {
          parentCategory = trigger.innerText.trim();
        }
      }

      var navData = {
        event: "navigation_click",
        menu_item: link.innerText.trim() || link.getAttribute("title") || "",
        menu_url: url,
        menu_level: menuLevel,
        parent_category: parentCategory,
        position: "header",
      };

      console.log("navigation_click pushed:", navData);

      if (!isNewTab) {
        e.preventDefault();

        navData.eventCallback = function () {
          window.location.href = url;
        };

        navData.eventTimeout = 800;
      }

      window.dataLayer.push(navData);

      if (!isNewTab) {
        setTimeout(function () {
          window.location.href = url;
        }, 900);
      }
    },
    true,
  );
})();
