import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      init(){

      }
      addToCart(){
        setLocalStorage(this.product)
      }
      renderProductDetails(){

      }
}
