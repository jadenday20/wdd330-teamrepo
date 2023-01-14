import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

////OG Solution
// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

//Jaden's Attempted Solution
function addProductToCart(product) {
  if (!("numOrders" in localStorage)){
    setLocalStorage("numOrders", 0)
    setLocalStorage(0, product)
  }
  else {
    let currOrder = getLocalStorage("numOrders") + 1
    setLocalStorage(currOrder, product)
    setLocalStorage("numOrders", currOrder);
  }

}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
