import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart")
                .addEventListener("click", this.addToCart.bind(this));
      }
      addToCart(){
        if (!("numOrders" in localStorage)) {
            setLocalStorage("numOrders", 0);
            setLocalStorage(0, this.product);
          } else {
            let currOrder = getLocalStorage("numOrders") + 1;
            setLocalStorage(currOrder, this.product);
            setLocalStorage("numOrders", currOrder);
          }
      }
      renderProductDetails(){

      }
}