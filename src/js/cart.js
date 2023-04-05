import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  setQuantity(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  if (getLocalStorage(item.Id)) {
    const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${
    item.Id
  }" class="cart-card__image">
    <img
      src="${item.Images["PrimaryLarge"]}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${getLocalStorage(item.Id)}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__delete" onclick="deleteItem('${
    item.Id
  }')">X</button>
</li>`;
    localStorage.removeItem(item.Id);

    return newItem;
  } else {
    return;
  }
}
if (getLocalStorage("so-cart") && getLocalStorage("so-cart").length != 0) {
  renderCartContents();
  let cartContents = getLocalStorage("so-cart");
  calculateSubtotal(cartContents);
} else {
  var checkoutLink = document.querySelector(".checkout-btn");
  checkoutLink.removeAttribute("onclick");
  checkoutLink.style.opacity = "50%";
  checkoutLink.style.cursor = "default";
}

function calculateSubtotal(productList) {
  var subtotal = 0;
  for (let i = 0; i < productList.length; i++) {
    subtotal += productList[i].FinalPrice;
  }
  var totalDiv = document.querySelector(".subtotal");
  totalDiv.innerHTML = "Subtotal:<br>$" + subtotal.toFixed(2);
}

function setQuantity(cartItems) {
  for (let i = 0; i < cartItems.length; i++) {
    let id = cartItems[i].Id;
    if (getLocalStorage(id)) {
      setLocalStorage(id, parseInt(getLocalStorage(id)) + 1);
    } else {
      setLocalStorage(id, 1);
    }
  }
}

//   export function deleteItem(Id) {
//     const cartItems = getLocalStorage("so-cart")
//     for (let i = 0; i < cartItems.length; i++) {
//       let id = cartItems[i].Id;
//       if (id == Id) {
//         cartItems.splice(i, 1);
//         setLocalStorage("so-cart", cartItems);
//         return;
//       }
//     }
// }
