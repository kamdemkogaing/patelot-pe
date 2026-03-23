(function () {
  const head = document.getElementsByTagName("head")[0];

  function loadScript(src) {
    const script = document.createElement("script"); // Tag erzeugen
    script.src = src;
    script.async = true; // async
    head.appendChild(script); // ans Ende des <head>
  }

  // Skripte einfügen
  loadScript("https://cdn.eye-able.com/configs/shop.printequipment.de.js");
  loadScript("https://cdn.eye-able.com/public/js/eyeAble.js");
})();
