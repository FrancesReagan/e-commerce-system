import {Product} from "../models/Product";
import {ProductData,ProductResponse} from "../types/types";
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
  }
}
