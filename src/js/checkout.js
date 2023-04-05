// import {
//   orderSummaryTemplate,
//   calculateSubtotal,
//   calculateTaxes,
//   calculateShipping,
//   calculateTotal,
// } from "./CheckoutProcess.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
loadHeaderFooter();

if (getLocalStorage("so-cart")) {
  const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
  myCheckout.init();

  // document.querySelector("#checkout").addEventListener("click", (e) => {
  //   e.preventDefault();
  //   myCheckout.checkout();
  // });

  document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
  // listening for click on the button

  // document.querySelector("#checkout").addEventListener("click", (e) => {
  //   e.preventDefault();
  //   myCheckout.checkout();
  // });

  document.querySelector("#checkout").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) myCheckout.checkout();
  });
} else {
  const checkoutForm = document.querySelector(".products");
  checkoutForm.style.display = "none";
  document.querySelector("main").innerHTML =
    "<h1>Uh Oh! Looks like your cart is empty:(</h1><a href='/index.html'>Back to the Homepage</a>";
}

// let cartContents = getLocalStorage("so-cart");

// let numItems = cartContents.length;
// let subtotal = calculateSubtotal(cartContents);
// let taxes = calculateTaxes(subtotal);
// let shipping = calculateShipping(numItems);
// let total = calculateTotal(subtotal, taxes, shipping);
// orderSummaryTemplate(numItems, subtotal, taxes, shipping, total);
