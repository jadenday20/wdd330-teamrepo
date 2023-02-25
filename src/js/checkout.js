import {
  orderSummaryTemplate,
  calculateSubtotal,
  calculateTaxes,
  calculateShipping,
  calculateTotal,
} from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

let cartContents = getLocalStorage("so-cart");

let numItems = cartContents.length;
let subtotal = calculateSubtotal(cartContents);
let taxes = calculateTaxes(subtotal);
let shipping = calculateShipping(numItems);
let total = calculateTotal(subtotal, taxes, shipping);
orderSummaryTemplate(numItems, subtotal, taxes, shipping, total);
