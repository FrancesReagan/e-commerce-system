
// app.js -javascript for the e-commerce UI//
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
    
}
