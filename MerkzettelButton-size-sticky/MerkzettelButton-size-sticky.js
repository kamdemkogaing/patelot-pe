const form = document.getElementById("productDetailPageBuyProductForm");

if (form) {
  const wishlistBtn = form.querySelector(".btn.header-actions-btn");

  wishlistBtn?.addEventListener("click", () => {
    console.log("Wishlist Button");
  });
}
