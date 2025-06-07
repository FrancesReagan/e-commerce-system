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
exports.ApiService = void 0;
const Product_1 = require("../models/Product");
const errorHandler_1 = require("../utils/errorHandler");
const API_BASE_URL = "https://dummyjson.com";
class ApiService {
    //fetch all products//
    static getAllProducts() {
        return __awaiter(this, arguments, void 0, function* (limit = 30) {
            try {
                const response = yield fetch(`${API_BASE_URL}/products?limit=${limit}`);
                if (!response.ok) {
                    throw new errorHandler_1.ApiError(`Failed to fetch products:${response.statusText}`, response.status);
                }
                const data = yield response.json();
                return data.products.map(productData => new Product_1.Product(productData));
            }
            catch (error) {
                (0, errorHandler_1.handleError)(error);
                throw error;
            }
        });
    }
    //fetch single product by ID//
    static getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/products/${id}`);
                if (!response.ok) {
                    throw new errorHandler_1.ApiError(`Failed to fetch product with ID ${id}: ${response.statusText}`, response.status);
                }
                const productData = yield response.json();
                return new Product_1.Product(productData);
            }
            catch (error) {
                (0, errorHandler_1.handleError)(error);
                throw error;
            }
        });
    }
    //search products by query//
    static searchProducts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new errorHandler_1.ApiError(`Failed to search products:${response.statusText}`, response.status);
                }
                const data = yield response.json();
                return data.products.map(productData => new Product_1.Product(productData));
            }
            catch (error) {
                (0, errorHandler_1.handleError)(error);
                throw error;
            }
        });
    }
    //get products by category//
    static getProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
                if (!response.ok) {
                    throw new errorHandler_1.ApiError(`Failed to fetch products for category ${category}: ${response.statusText}`, response.status);
                }
                const data = yield response.json();
                return data.products.map(productData => new Product_1.Product(productData));
            }
            catch (error) {
                (0, errorHandler_1.handleError)(error);
                throw error;
            }
        });
    }
    //get all categories//
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${API_BASE_URL}/products/categories`);
                if (!response.ok) {
                    throw new errorHandler_1.ApiError(`Failed to fetch categories: ${response.statusText}`, response.status);
                }
                const categories = yield response.json();
                return categories;
            }
            catch (error) {
                (0, errorHandler_1.handleError)(error);
                throw error;
            }
        });
    }
}
exports.ApiService = ApiService;
