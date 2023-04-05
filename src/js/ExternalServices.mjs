// const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
const baseURL = "https://wdd330-backend.onrender.com/";
// const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
//const baseURL = "http://server-nodejs.cit.byui.edu:3000/login";
//const baseURL = "https://wdd330-backend.vercel.app/";
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    // var jsonResponse = res.body;
    // throw { name: "servicesError", message: jsonResponse };
    
    return res.json()
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
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
    async loginRequest(user) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(baseURL + "login", options).then(
        convertToJson
      );
      return response.accessToken;
    }

    async getOrders(token) {
      const options = {
        method: "GET",
        // the server will reject our request if we don't include the Authorization header with a valid token!
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(baseURL + "orders", options).then(
        convertToJson
      );
      return response;
    }
    
  }





//     try {
//       const checkoutResponse = await fetch(baseURL + "checkout/", options)
//       // const checkoutJSON = await convertToJson(checkoutResponse)
//       const checkoutJSON = await checkoutResponse.json()
//       // console.log("POST RESPONSE: ", await checkoutJSON)
//       return { ok: !!checkoutResponse.ok, response: checkoutJSON, errorMessage: checkoutResponse.body };
//     } catch(err) {
//       console.log(err);
//       return err;
//     }
//   }
