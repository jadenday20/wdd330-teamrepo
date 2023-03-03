// import {
//   orderSummaryTemplate,
//   calculateSubtotal,
//   calculateTaxes,
//   calculateShipping,
//   calculateTotal,
// } from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();


const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector("#checkout").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});


// let cartContents = getLocalStorage("so-cart");

// let numItems = cartContents.length;
// let subtotal = calculateSubtotal(cartContents);
// let taxes = calculateTaxes(subtotal);
// let shipping = calculateShipping(numItems);
// let total = calculateTotal(subtotal, taxes, shipping);
// orderSummaryTemplate(numItems, subtotal, taxes, shipping, total);