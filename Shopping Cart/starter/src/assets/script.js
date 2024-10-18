// Store products defined as Objects. These will be stored inside the "products" Array. The objects also contain the images of the products stored in the images folder.
const cherry = {
  name: "Box of Cherries",
  price: 7.99,
  quantity: 0,
  productId: 1001,
  image: "./images/cherry.jpg"
};

const orange = {
  name: "Box of Oranges",
  price: 5.99,
  quantity: 0,
  productId: 1002,
  image: "./images/orange.jpg"
};

const strawberry = {
  name: "Box of Strawberries",
  price: 3.99,
  quantity: 0,
  productId: 1003,
  image: "./images/strawberry.jpg"
};

//Array to store all products defined above
const products = [cherry, orange, strawberry];


//Empty array to store all products added to shopping cart.
const cart = [];

//Fundtion to find Product by productId.
function getProduct(productList, productId) {
  return productList.find((product) => product.productId === productId);
}

// Function to add product to cart when first clicked on the item. This function increases the quantity of the product to +1.
function addProductToCart(productId) {
  const product = getProduct(products, productId) //gets the right product based on the productId provided from the array products

  if (!product) return; //If product is not found then return nothing.

  product.quantity++; //increases product quantity by one
  //If product is not in cart then add product to cart
  if(!cart.includes(product)) {
    cart.push(product);
  }
}

//Function to increase the quantity of the product by one in the shopping cart.
function increaseQuantity(productId) {
  const product = getProduct(products, productId) //gets the right product based on the productId provided from the array products
  if (!product) return; //If product is not found then return nothing.
  
  product.quantity++; //increases product quantity by one  
}

/*
Function to decrease the quantity of the product in the cart by one. 
The function also checks if the quantity of the product is 0 after it decreases by 1 then it calls
on the function "removeProductFromCart" to remove the item from the shopping cart.
*/
function decreaseQuantity(productId) {
  const product = getProduct(products, productId) //gets the right product based on the productId provided from the array products
  if (!product) return; //If product is not found then return nothing.

  //Checks to see if product quantity is greater than 0. If yes, then subtract one.
  if (product.quantity > 0) {
    product.quantity--; //subtract one from product quantity
  }
  //If product quantity is 0 then remove it from cart.
  if (product.quantity === 0) {
        removeProductFromCart(productId);
  }
}

//Function to remove a product from the shopping cart.
function removeProductFromCart(productId) {
  const productIndex = cart.findIndex((product) => product.productId === productId);
  cart[productIndex].quantity = 0;  //sets the product quantity to 0
  cart.splice(productIndex, 1); // removes the product from the cart.
}

//Function that returns the total price of all the items in the shopping cart.
function cartTotal() {
  //creates a new array to store the total price of each product in the shopping cart.
  const totalPricePerProduct = cart.map(function(product) {
    product = product.quantity * product.price;
    return product;
  });
  //Returns the total price in cart.
  const total = totalPricePerProduct.reduce((accumulator, currentValue) => accumulator + currentValue);
  return total;
}

//Function that removes all products from the shopping cart and resets the quantity of all products to 0.
function emptyCart() {
  for (let i = 0; i < cart.length; i++) {
    cart[i].quantity = 0;
  }
  cart.splice(0,cart.length);
}


//Global variable to keep track of payments by the customer.
let totalPaid = 0;

//Function to keep track of remaining balance. If fully paid then we empty the cart.
function pay(amount) {
  totalPaid += amount;
  let remainingBalance = totalPaid - cartTotal();
  
  //Checks to see if remainingBalance is greater than zero. If yes, reset the totalPaid to 0 and remove all items from cart.
  if (remainingBalance >= 0) {
    totalPaid = 0;
    emptyCart();
  }

  return remainingBalance;
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
