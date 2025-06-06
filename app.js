
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
