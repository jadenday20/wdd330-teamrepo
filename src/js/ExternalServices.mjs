// const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
// const baseURL = "https://wdd330-backend.onrender.com/";
const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    var jsonResponse = res.body;
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const checkoutResponse = await fetch(baseURL + "checkout/", options)
      console.log("POST RESPONSE: ", checkoutResponse)
      const checkoutJSON = await convertToJson(checkoutResponse)
      return checkoutJSON;
    } catch(err) {
      console.log(err);
      return err;
    }
  }
}