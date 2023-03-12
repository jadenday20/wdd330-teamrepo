import { getLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}
// function packageDetails(details) {
//   const simplifiedDetails = details.map((item) => {
//     console.log(item);
//     return {
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//       quantity: 1,
//     };
//   });
//   return simplifiedDetails;
// }

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #numItems"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  }
  calculateOrdertotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }
  // getHTMLElements() {
  //   this.fname = document.querySelector(
  //     "#firstName"
  //   ).value;
  //   this.lname = document.querySelector(
  //     "#lastName"
  //   ).value;
  //   this.street = document.querySelector(
  //     "#street"
  //   ).value;
  //   this.city = document.querySelector(
  //     "#city"
  //   ).value;
  //   this.state = document.querySelector(
  //     "#state"
  //   ).value;
  //   this.zip = document.querySelector(
  //     "#zip"
  //   ).value;
  //   this.cardNumber = document.querySelector(
  //     "#cardNumber"
  //   ).value;
  //   this.expiration = document.querySelector(
  //     "#expiration"
  //   ).value;
  //   this.code = document.querySelector(
  //     "#security"
  //   ).value;
  // }
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date().toJSON();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    // this.getHTMLElements();
    json.fname = document.querySelector("#firstName").value;
    json.lname = document.querySelector("#lastName").value;
    json.street = document.querySelector("#street").value;
    json.city = document.querySelector("#city").value;
    json.state = document.querySelector("#state").value;
    json.zip = document.querySelector("#zip").value;
    json.cardNumber = document.querySelector("#cardNumber").value;
    json.expiration = document.querySelector("#expiration").value;
    json.code = document.querySelector("#security").value;
    console.log(json);

    
    // try {
    const res = await services.checkout(json);
    localStorage.removeItem("so-cart");
    console.log("RESPONSE: ", res);

    if (res.ok) window.location.href = "../checkout/success.html";
    else {
      const errors = Object.keys(res.response)
      console.log("ERRORS: ", errors)
      console.log("error1: ", res.response["cardNumber"])
      
      removeAllAlerts();
      
      errors.map((errorKey) => {
        console.log(errorKey)

        alertMessage(res.response[errorKey]);
      })
      // for(let message in errors) {
      //    alertMessage(res.response[message]);
      // }
    }
    // } catch (err) {
    //   console.log("ERR: ", err);
    //   removeAllAlerts();
    // }
  }
}