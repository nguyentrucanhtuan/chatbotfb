const fetch = require('node-fetch');
function WooAPI(opt) {

}

WooAPI.prototype.getCategories(){
   return fetch('https://tnt-react.herokuapp.com/api/categories').then((response) => response.json())
}

WooAPI.prototype.productsByCategoryId(category, per_page = 5){
  var data = {category: categoryId, per_page: per_page}
  return fetch('https://tnt-react.herokuapp.com/api/products?'+querystring.stringify(data)).then((response) => response.json())
}

export default WooAPI;
