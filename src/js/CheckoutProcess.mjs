export function calculateSubtotal(productList){
    var subtotal = 0;
    for (let i = 0; i < productList.length; i++){
        subtotal += productList[i].FinalPrice;
    }
    return subtotal;
}

export function calculateTaxes(subtotal){
    var taxes = (subtotal * 0.06).toFixed(2); 
    return taxes;
}

export function calculateShipping(numItems){
    var shipping = 10 + numItems * 2;
    return shipping;
}

export function calculateTotal(subtotal, taxes, shipping){
    return parseFloat(subtotal) + parseFloat(taxes) + parseFloat(shipping);
}

export function orderSummaryTemplate(numItems, subtotal, taxes, shipping, total) {
    // return `<fieldset class="summary-template">
    // <legend>Order Summary</legend>
    //   <label for="subtotal" class="">Item Subtotal(${numItems}):</label>
    //   <p name="subtotal">${subtotal}</p>
    //   <label for="shipping" class="">Shipping Estimate:</label>
    //   <p name="shipping"> ${shipping}</p>
    //   <label for="tax" class="">Tax:</label> 
    //   <p name="tax">${taxes}</p>
    //   <label for="total" class=""><b>Order Total:<b/></label> 
    //   <p name="total">${total}</p>
    //   </fieldset>`;
    document.getElementById("numItems").textContent = numItems;
    document.getElementById("cart-subtotal").textContent = "$" + subtotal;
    document.getElementById("shipping-est").textContent = "$" + shipping;
    document.getElementById("Tax").textContent = "$" + taxes;
    document.getElementById("total").textContent = "$" + total;
  }