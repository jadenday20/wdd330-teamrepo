import {orderSummaryTemplate, calculateSubtotal, calculateTaxes, calculateShipping, calculateTotal} from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

let cartContents = getLocalStorage("so-cart");
console.log(cartContents);


let test = calculateSubtotal();
let numItems = 2;
let subtotal = 320;
let taxes = calculateTaxes(subtotal);
let shipping = calculateShipping(numItems);
let total = calculateTotal(subtotal, taxes, shipping);
orderSummaryTemplate(numItems, subtotal, taxes, shipping, total);