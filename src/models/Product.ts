//src/models/Product.ts/
import { kStringMaxLength } from 'buffer';
import { ProductData, Dimensions, Review, ProductMeta, ReviewSummary } from '../types/types';
import { chmod } from 'fs';
import { getUnpackedSettings } from 'http2';

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
  private images: string[];

  //getters//
  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getCategory(): string {
    return this.category;
  }

  getPrice(): number {
    return this.price;
  }

  getDiscountPercentage(): number {
    return this.discountPercentage;
  }

  getRating(): number {
    return this.rating;
  }

  getStock(): number {
    return this.stock;
  }

  getTags(): string[] {
    return this.tags;
  }

  getBrand(): string {
    return this.brand;
  }

  getSku(): string {
    return this.sku;
  }

  getWeight(): number {
    return this.weight;
  }

  getDimensions(): Dimensions {
    return this.dimensions;
  }

  getWarrantyInformation(): string {
    return this.warrantyInformation;
  }

  getShippingInformation(): string {
    return this.shippingInformation;
  }

  getAvailabilityStatus(): string {
    return this.availabilityStatus;
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  getReturnPolicy() {
    return this.returnPolicy;
  }

  getMinimumOrderQuantity(): number {
    return this.minimumOrderQuantity;
  }
  getMeta(): ProductMeta {
    return this.meta;
  }

  getThumbnail(): string {
    return this.thumbnail;
  }

  getImages():string[] {
    return this.images;
  }

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
//display product details//
displayDetails(): string {
  displayDetails(): string {
    const priceWithDiscount = this.getPriceWithDiscount();
    const savings = this.price - priceWithDiscount;

    return `
    Product Details:
    ==================
    ID:${this.id}
    SKU:${this.sku}
    Title:${this.title}
    Brand: ${this.brand}
    Category: ${this.category}
    Tags: ${this.tags.join(',')}
    Description: ${this.description}

    Pricing Information:
    --------------
    Original Price: ${this.price.toFixed(2)}
    Discount: ${this.discountPercentage}%
    Price after discount: ${priceWithDiscount.toFixed(2)}
    You save: ${savings.toFixed(2)

    Product Specifications:
    ----------------------
    Weight: ${this.weight} kg 
    Dimensions: ${this.dimensions.width} x ${this.dimensions.height} x ${this.dimensions.depth} cm 
    Rating: ${this.rating}/5 (${this.reviews.length} reviews)
    Stock: ${this.stock} units 
    Availability: ${this.availabilityStatus}
    Minimum Order: ${this.minimumOrderQuantity} units 

    Policies:
    -------
    Warranty: ${this.warrantyInformation}
    Shipping: ${this.shippingInformation}
    Returns: ${this.returnPolicy}

    Metadata:
    -------
    Barcode: ${this.meta.barcode}
    Created: ${new Date(this.meta.createdAt).toLocaleDateString()}
    Updated: ${new Date(this.meta.updatedAt).toLocaleDateString()}
    `;
  }
}

