
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

