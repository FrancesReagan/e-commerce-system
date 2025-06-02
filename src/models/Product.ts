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
  private weight: number;
  private dimensions: Dimensions;
  private warrantyInformation: string;
  private shippingInformation: string;
  private availabilityStatus: string;
  private reviews: Review[];
  private returnPolicy: string;
  private minimumOrderQuantity: number;
  private meta: ProductMeta;
  private thumbnail: string;
  private image: string[];

  constructor(data: ProductData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.price = data.price;
    this.discountPercentage = data.discountPercentage;
    this.rating = data.rating;
    this.stock = data.stock;
    this.tags = data.tags;
    this.brand = data.brand;
    this.sku = data.sku;
    this.weight = data.weight;
    this.dimensions = data.dimensions;
    this.warrantyInformation = data.warrantyInformation;
    this.shippingInformation = data.shippingInformation;
    this.availabilityStatus = data.availabilityStatus;
    this.reviews = data.reviews;
    this.returnPolicy = data.returnPolicy;
    this.minimumOrderQuantity = data.minimumOrderQuantity;
    this.meta = data.meta;
    this.thumbnail = data.thumbnail;
    this.images = data.images;
  }

}


