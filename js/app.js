const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // const allProducts = products.map((pd) => pd);
  for (const product of products) {
    const image = product.image;
    const rating = product.rating.rate;
    // star rating 
    const star1 = (rating > 4) ? 'fill-rate' : 'noRating';
    const star2 = (rating > 3 && rating <= 4) ? 'fill-rate' : 'noRating';
    const star3 = (rating > 2 && rating <= 3) ? 'fill-rate' : 'noRating';
    const star4 = (rating > 1 && rating <= 2) ? 'fill-rate' : 'noRating';
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-category">Category: <span class="category-name">${product.category}</span></p>
      <p class="product-ratings">Ratings:<span>
      <i class="fas fa-star rating ${star1} ${star2} ${star3} ${star4}"></i>
      <i class="fas fa-star rating ${star1} ${star2} ${star3}"></i>
      <i class="fas fa-star rating ${star1} ${star2}"></i>
      <i class="fas fa-star rating ${star1}"></i>
      <i class="fas fa-star rating"></i>
      </span> ${product.rating.rate}</p>
      <p class="total-ratings">Total Ratings: <i class="fas fa-user"></i><span class="ratings-number">${product.rating.count}</span></p>
      
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="add-to-cart btn">add to cart</button>
      <button id="details-btn" class="btn details">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//Add to cart function
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
//Get innerText function
const getInnerTextValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInnerTextValue(id);
  const convertPrice = parseFloat(value);
  const total = Math.abs(convertedOldPrice + convertPrice);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInnerTextValue("price");
  if (priceConverted > 0 && priceConverted < 200) {
    setInnerText("delivery-charge", 20);
    // setInnerText("total-tax", priceConverted * 0.2);
  } else if (priceConverted >= 200 && priceConverted < 400) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  } else if (priceConverted >= 400 && priceConverted < 500) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  } else {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInnerTextValue("price") + getInnerTextValue("delivery-charge") +
    getInnerTextValue("total-tax");
  document.getElementById("total").innerText = Math.abs(grandTotal).toFixed(2);
};






/*
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  // const allProducts = products.map((pd) => pd);
  for (const product of products) {
    console.log(product)
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInnerTextValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInnerTextValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInnerTextValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInnerTextValue("price") + getInnerTextValue("delivery-charge") +
    getInnerTextValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
 */
