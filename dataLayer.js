window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });
window.dataLayer.push({
    pageTitle: "Printequipment",
    pageSubCategory: "",
    pageCategoryID: "",
    pageSubCategoryID: "",
    pageCountryCode: "de-DE",
    pageLanguageCode: "Deutsch",
    pageVersion: 1,
    pageTestVariation: "1",
    pageValue: 1,
    pageAttributes: "1",
    pageCategory: "Auth",
    visitorLoginState: "Logged Out",
    visitorType: "NOT LOGGED IN",
    visitorLifetimeValue: 0,
    visitorExistingCustomer: "No"
});

var dtgsRemarketingEnabled = true;

var googleTagManagerFunction = function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });

    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';

    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;

    var n = d.querySelector('[nonce]');
    if (n) {
        j.setAttribute('nonce', n.nonce || n.getAttribute('nonce'));
    }

    f.parentNode.insertBefore(j, f);
};

setTimeout(() => {
    googleTagManagerFunction(
        window,
        document,
        'script',
        'dataLayer',
        'GTM-NK8QCGM'
    );
}, 3000);