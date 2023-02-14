import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// ////OG Solution
// // function addProductToCart(product) {
// //   setLocalStorage("so-cart", product);
// // }

// //Jaden's Attempted Solution
// function addProductToCart(product) {
//   if (!("numOrders" in localStorage)) {
//     setLocalStorage("numOrders", 0);
//     setLocalStorage(0, product);
//   } else {
//     let currOrder = getLocalStorage("numOrders") + 1;
//     setLocalStorage(currOrder, product);
//     setLocalStorage("numOrders", currOrder);
//   }
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
