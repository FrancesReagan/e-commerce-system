//src/models/Product.ts/
import { ProductData, Dimensions, Review, ProductMeta, ReviewSummary } from '../types/types';

export class Product {
  private id: number;
  private title: string;
  private description: string;
  private category: string;
  private price: number;
  private discountPercentage: number;
  private rating: number;
  private stock: number;
  private tags: string[];
  private brand: string;
  private sku: string;
  

}
