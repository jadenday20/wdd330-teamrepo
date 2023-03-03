import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
// const result = dataSource.getData(category);
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
