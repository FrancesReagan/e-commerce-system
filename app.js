d
// app.js -javascript for the e-commerce UI//

const { displayPartsToString } = require("typescript");

//this file uses async/await for all asynchronous operations//
const API_BASE_URL = "https://dummyjson.com";
// state management//
let currentProducts = [];
let allCategories = [];

// DOM elements//
const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const loadingDiv = document.getElementById("loading");
const errorDiv= document.getElementById("error-message");

// initialize the application//
async function init() {
  try {
    showloading(true);
    // load categories and products simultaneously//
    const[categories, products] = await Promise.all([
      fetchCategories(),
      fetchProducts(),
    ]);

    allCategories = categories;
    currentProducts = products;

    populateCategoryDropdown(categories);
    displayProducts(products);

    // set up event listeners//
    setupEventListeners();
  } catch (error) {
    showError("Failed to initialize the application. Please refresh the page.");
    console.error("Initialization error:", error);
  }finally{
    showloading(false);
  }
     }
// fetch all products using async/await//
async function fetchProducts(limit=30) {
  try{
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error. Status:${response.status}`);

    }
    const data = await response.json();
    return data.products;

  } catch (error){
    console.error("Error fetching products:", error);
    throw error;
  }
}

//fetch a single product by ID using async/await//
async function fetchProductById(id) {
  try{
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if(!response.ok) {
      throw new Error(`Product not found with ID:${id}`);
    }

    const product = await response.json();
    return product;
  } catch(error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
// search products using async/await//
async function searchProducts(query){
  try{
    showLoading(true);
    hideError();
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if(!response.ok) {
      throw new Error("Search failed");
    }
    const data = await response.json();
    return data.products;
  } catch(error) {
    console.error("Search error:",error);
    showError("Search failed.Please try again.");
    return [];
  }finally {
    showLoading(false);
  }
}

// fetch products by category using async/await//
async function fetchProductsByCategory(category){
  try {
    showLoading(true);
    hideError();
    const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
    if(!response.ok) {
      throw new Error(`Failed to fetch products for category:${category}`);
    }
    const data = await response.json();
    return data.products;

  }catch (error){
    console.error("Category fetch error:",error);
    showError("Failed to load category products");
    return[];
  }finally{
    showLoading(false);
  }
}

// fetch all categories using async/await//
async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if(!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    return categories;
  }catch(error){
    console.error("Categories fetch error:",error);
    return [];
  }
}
// display products in grid//
function displayProducts(products){
  if(!products || !products.length === 0) {
    productsGrid.innerHTML = '<p class="no-products">No products found.</p>';
    return;
  }
  productsGrid.innerHTML = products.map(product => createProductCard(product)).join("");
}

// create product card HTML//
function createProductCard(product){
  const discountedPrice = calculateDiscountedPrice(product.price,product.discountPercentage);
  const taxAmount = calculateTax(discountedPrice, product.category);
  const finalPrice = discountedPrice + taxAmount;
  return `
  <div class="product-card" data-product-id="${product.id}">
    <img src="${product.thumbnail} alt="${product.title}" class="product-image">
    <div class="product-info">
    <h3 class="product-title">${product.title}</h3>
    <p class="product-brand">${product.brand}</p>
    <p class="product-category">${product.category}</p>
     <div class="product-rating">
     <span class="rating-value">${product.rating}</span>
    </div>
  <div class="product-pricing">
    <p class="original-price">$${product.price.toFixed(2)}</p>
    <p class="discount-badge">${product.discountPercentage}% OFF,</p>
    <p class="discounted-price">$${discountedPrice.toFixed(2)}</p>
    <p class="tax-info">Tax:$${taxAmount.toFixed(2)}</p>
    <p class="final-price">Total:$${finalPrice.toFixed(2)}</p>
   </div>
   <p class="product-stock">Stock:${product.stock} units</p>
   <button class="view-details-btn" onclick="viewProductDetails(${product.id})">View Details</button>
   </div>
  </div>
    `;
}

// view product details (async function)//
async function viewProductDetails(productID){
  try {
    showLoading(true);
    const product = await fetchProductById(productId);
    // display product details in a modal or detailed view//
    alert(`
      Product Details:
      ====================
      Title:${product.title}
      Brand:${product.brand}
      Description:${product.description}
      Prics:$${product.price}
      Discount:${product.discountPercentage}%
      Rating:${product.rating}/5
      Stock:${product.stock} units
      `);
  }catch(error){
    showError("Failed to load product details.");
  }finally{
    showLoading(false);
  }
}

// calculate discounted price//
function calculateDiscountedPrice(price,discountPercentage){
  return price - (price*discountPercentage/100);
}

// calculate tax//
function calculateTax(price,category){
  const taxRate = category.toLowerCase() === "groceries" ?0.03:0.0475;
  return price * taxRate;
}

// populate category dropdown//
function populateCategoryDropdown(categories){
  const options = ['<option value="">All Categories</option>'];

 categories.forEach(category => {
        options.push(`<option value="${category}">${category}</option>`);
    });
categorySelect.innerHTML = options.join("");
}

// set up event listeners//
function setupEventListeners(){
  // search functionality//
  searchButton.addEventListener("click", async()=>{
    const query = searchInput.ariaValueMax.trim();
    if(query){
      const results = await searchProducts(query);
      displayProducts(results);
    }
  });
// search on enter key//
searchInput.addEventListener("keypress", async(e)=>{
  if(e.key === "Enter"){
    const query = searchInput.ariaValueMax.trim();
    if(query) {
      const results = await searchProducts(query);
      displayProducts(results);
    }
  }
});

// category filter//
categorySelect.addEventListener("change", async(e)=>{
  const category = e.target.value;
  if(category){
    const products = await fetchProductsByCategory(category);
    displayProducts(products);
  }else{
    // show all products//
    displayProducts(currentProducts);
  }
});
// clear search//
searchInput.addEventListener("input", async(e)=>{
  if(e.target.value === ""){
    displayProducts(currentProducts);
  }
});
}

// UI helper functions//
function showLoading(show){
  loadingDiv.style.display = show ? "block" : "none";
}

function showError(message){
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

function hideError(){
  errorDiv.style.display = "none";
}

// initialize the app when DOM is loaded//
document.addEventListener("DOMContentLoaded", init);