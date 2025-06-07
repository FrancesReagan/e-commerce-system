"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiService_1 = require("./services/apiService");
const discountCalculator_1 = require("./utils/discountCalculator");
const taxCalculator_1 = require("./utils/taxCalculator");
const errorHandler_1 = require("./utils/errorHandler");
class ECommerceApp {
    constructor() {
        this.products = [];
        console.log("E-Commerce System Starting...\n");
    }
    // initialize the application//
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // fetch and display all products//
                yield this.fetchAndDisplayProducts();
                // demonstrate single product fetch//
                yield this.demonstrateSingleProductFetch();
                // demonstrate search functionality//
                yield this.demonstrateSearch();
                // demonstrate category filtering//
                yield this.demonstrateCategoryFilter();
                // demonstrate tax calculations//
                yield this.demonstrateTaxCalculations();
                // deomonstrate error handling//
                yield this.demonstrateErrorHandling();
            }
            catch (error) {
                (0, errorHandler_1.handleError)(error);
            }
        });
    }
    // fetch and display all products//
    fetchAndDisplayProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching all products...\n");
            try {
                // fetch 10 products for demo//
                this.products = yield apiService_1.ApiService.getAllProducts(10);
                console.log(`Found ${this.products.length} products:\n`);
                this.products.forEach((product, index) => {
                    console.log(`${index + 1}. ${product.getTitle()} - ${(0, discountCalculator_1.formatPrice)(product.getPrice())}`);
                });
                console.log("\n" + "=".repeat(50) + "\n");
            }
            catch (error) {
                throw error;
            }
        });
    }
    // demonstrate fetching a single product//
    demonstrateSingleProductFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching single product (ID:1)...\n");
            try {
                const product = yield apiService_1.ApiService.getProductById(1);
                console.log(product.displayDetails());
                // show discount calculation//
                const discountAmount = (0, discountCalculator_1.calculateDiscount)(product.getPrice(), product.getDiscountPercentage());
                console.log(`Discount amount: ${(0, discountCalculator_1.formatPrice)(discountAmount)}`);
                console.log("\n" + "=".repeat(50) + "\n");
            }
            catch (error) {
                throw error;
            }
        });
    }
    // demonstrate search functinality//
    demonstrateSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Searching for "phone"...\n');
            try {
                const searchResults = yield apiService_1.ApiService.searchProducts("phone");
                if (searchResults.length === 0) {
                    console.log("No products found.");
                }
                else {
                    console.log(`Found ${searchResults.length} products:\n`);
                    searchResults.forEach(product => {
                        console.log(`-${product.getTitle()}(${product.getBrand()})- ${(0, discountCalculator_1.formatPrice)(product.getPrice())}`);
                    });
                }
                console.log("\n" + "=".repeat(50) + "\n");
            }
            catch (error) {
                throw error;
            }
        });
    }
    // demonstrate category filtering//
    demonstrateCategoryFilter() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching products by category...\n");
            try {
                // first get all categories//
                const categories = yield apiService_1.ApiService.getCategories();
                console.log(`Available categories: ${categories.slice(0, 5).join(",")}...\n`);
                // fetch products from a specific category//
                const category = "smartphones";
                console.log(`Fetching products from "${category}" category:\n`);
                const categoryProducts = yield apiService_1.ApiService.getProductsByCategory(category);
                categoryProducts.slice(0, 3).forEach(product => {
                    console.log(`-${product.getTitle()}-${(0, discountCalculator_1.formatPrice)(product.getPrice())}`);
                });
                console.log("\n" + "=".repeat(50) + "\n");
            }
            catch (error) {
                throw error;
            }
        });
    }
    // demonstrate tax calculations//
    demonstrateTaxCalculations() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Demonstrating tax calculations...\n");
            if (this.products.length === 0) {
                console.log("No products available for tax demonstration.");
                return;
            }
            // take first few products for demonstration//
            const demoProducts = this.products.slice(0, 3);
            demoProducts.forEach(product => {
                const priceAfterDiscount = product.getPriceWithDiscount();
                const taxAmount = (0, taxCalculator_1.calculateTax)(priceAfterDiscount, product.getCategory());
                const breakdown = (0, taxCalculator_1.getPriceBreakdown)(priceAfterDiscount, product.getCategory());
                console.log(`Product:${product.getTitle()}`);
                console.log(`Category:${product.getCategory()}`);
                console.log(`Original Price:${(0, discountCalculator_1.formatPrice)(product.getPrice())}`);
                console.log(`Price after discount:${(0, discountCalculator_1.formatPrice)(priceAfterDiscount)}`);
                console.log(`Tax Rate:${breakdown.taxRate}%`);
                console.log(`Tax Amount:${(0, discountCalculator_1.formatPrice)(taxAmount)}`);
                console.log(`Final Price(with tax): ${(0, discountCalculator_1.formatPrice)(breakdown.total)}`);
                console.log("-".repeat(30));
            });
            console.log("\n" + "=".repeat(50) + "\n");
        });
    }
    // demonstrate error handling//
    demonstrateErrorHandling() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Demonstrating error handling...\n");
            // test API error - invalid product ID//
            console.log("1.Testing invalid product ID:");
            try {
                yield apiService_1.ApiService.getProductById(999999);
            }
            catch (error) {
                console.log("Error caught and handled gracefully.\n");
            }
            // test validation error//
            console.log("2. Testing validation error:");
            try {
                (0, discountCalculator_1.calculateDiscount)(-100, 20);
            }
            catch (error) {
                if (error instanceof Error) {
                    const validationError = new errorHandler_1.ValidationError(error.message, "price");
                    (0, errorHandler_1.handleError)(validationError);
                }
            }
            console.log("\n Application demonstration complete");
        });
    }
}
// main execution//
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new ECommerceApp();
        yield app.init();
    });
}
// run the application//
main().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
});
