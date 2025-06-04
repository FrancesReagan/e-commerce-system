import {Product} from "../models/Product";
import {ProductData,ProductResponse, ProductsResponse} from "../types/types";
import {handleError, ApiError} from "../utils/errorHandler";

const API_BASE_URL = "https://dummyjson.com";

export class ApiService {
  //fetch all products//
  static async getAllProducts(limit:number = 30): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);

      if(!response.ok) {
        throw new ApiError(`Failed to fetch products:${response.statusText}`,
          response.status

        );
      }
    }
    const data: ProductsResponse = await response.json();
    return data.products.map(productData => new Product(productData));
  }catch(error){
    handleError(error);
    throw error;
  }
  }

  //fetch single product by ID//
  static async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if(!Response.ok) {
        throw new ApiError(
          `Failed to fetch product with ID ${id}: ${response.statusText}`,
          response.status
        );
      }
const productData: ProductData = await response.json();
return new Product(productData);
    }catch(error){
      handleError(error);
      throw error;
    }
    }
  
    //search products by query//
    static async searchProducts(query: string): Promise<Product[]> {
      try{
        const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
        if(!Response.ok){
          throw new ApiError(
            `Failed to search products:${response.statusText}`,
            response.status
          );
        }
const data: ProductsResponse = await response.json();
return data.products.map(productData=> new Product(productData));
      } catch (error){
        handleError(error);
        throw error;
      } 
      }
//get products by category//
static async getProductsByCategory(category:string): Promise<Product[]> {
  try {
    const response = await
    fetch(`$(API_BASE_URL}/products/category/${encodeURIComponent(category)}`);

    if(!Response.ok) {
      throw new ApiError(
        `Failed to fetch products for category ${category}: ${Response.statusText}`,
        response?.status
      );
    }
    const data: ProductsResponse = await response.json();
    return data.products.map((productData => new Product(productData));
  } catch (error) {
    handleError(error);
    throw error;
  }
  }
//get all categories//
static async getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if(!response.ok) {
      throw new ApiError(
        `Failed to fetch categories: ${Response.statusText}`,
        response.status
      );
    }

    const categories: string[] = await response.json();
    return categories;
  } catch (error) {
    handleError(error);
    throw error;
  }
  }
}




      
    
