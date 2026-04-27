document.addEventListener("DOMContentLoaded", function () {
  var navigationRoot = document.querySelector(
    ".cms-element-category-navigation",
  );

  if (!navigationRoot) {
    return;
  }

  var entries = navigationRoot.querySelectorAll(
    ".category-navigation.level-0 > .category-navigation-entry",
  );

  entries.forEach(function (entry) {
    var directLink = entry.querySelector(":scope > .category-navigation-link");
    var subNav = entry.querySelector(":scope > .category-navigation.level-1");

    if (!directLink || !subNav) {
      return;
    }

    entry.classList.add("has-children");

    var linkIsActive = directLink.classList.contains("is-active");
    var activeChild = subNav.querySelector(
      ".category-navigation-link.is-active",
    );

    if (linkIsActive || activeChild) {
      entry.classList.add("is-open");
      entry.classList.remove("is-collapsed");
      directLink.classList.add("current-parent");
      subNav.style.maxHeight = subNav.scrollHeight + "px";
    } else {
      entry.classList.add("is-collapsed");
      entry.classList.remove("is-open");
      subNav.style.maxHeight = "0px";
    }

    directLink.addEventListener("click", function (event) {
      var isCollapsed = entry.classList.contains("is-collapsed");

      if (isCollapsed) {
        event.preventDefault();

        entries.forEach(function (otherEntry) {
          if (
            otherEntry !== entry &&
            otherEntry.classList.contains("has-children")
          ) {
            var otherLink = otherEntry.querySelector(
              ":scope > .category-navigation-link",
            );
            var otherSubNav = otherEntry.querySelector(
              ":scope > .category-navigation.level-1",
            );
            var otherHasActiveChild = otherSubNav
              ? otherSubNav.querySelector(".category-navigation-link.is-active")
              : null;
            var otherLinkIsActive =
              otherLink && otherLink.classList.contains("is-active");

            if (!otherHasActiveChild && !otherLinkIsActive) {
              otherEntry.classList.remove("is-open");
              otherEntry.classList.add("is-collapsed");

              if (otherLink) {
                otherLink.classList.remove("current-parent");
              }

              if (otherSubNav) {
                otherSubNav.style.maxHeight = "0px";
              }
            }
          }
        });

        entry.classList.remove("is-collapsed");
        entry.classList.add("is-open");
        directLink.classList.add("current-parent");
        subNav.style.maxHeight = subNav.scrollHeight + "px";
      }
    });
  });

  window.addEventListener("resize", function () {
    entries.forEach(function (entry) {
      var subNav = entry.querySelector(":scope > .category-navigation.level-1");

      if (subNav && entry.classList.contains("is-open")) {
        subNav.style.maxHeight = subNav.scrollHeight + "px";
      }
    });
  });
});
