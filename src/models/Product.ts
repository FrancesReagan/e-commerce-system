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
  private images: string[];

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
    You save: ${savings.toFixed(2)}

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

  getReturnPolicy(): string {
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

// calculate price with discount//
getPriceWithDiscount(): number {
      const discountAmount =(this.price * this.discountPercentage) / 100;
      return this.price - discountAmount;
    }

//additional utility methods//
//check if product is in stock//
isInStock(): boolean {
  return this.stock > 0;
    }

//check if product is low in stock//
isLowStock(): boolean {
       return this.availabilityStatus.toLowerCase().includes('low');
    }

//get average review rating//
getAverageReviewRating(): number {
    if(this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  }

//get total volume of product//
getVolume(): number {
return this.dimensions.width * this.dimensions.height * this.dimensions.depth;
    }

//check if product has a specific tag//
hasTag(tag: string): boolean {
    return this.tags.some(t=>t.toLowerCase()===tag.toLowerCase());
    }

    //get formatted dimensions string//
    getFormattedDimensions(): string {
    return `${this.dimensions.width}W x ${this.dimensions.height}H x ${this.dimensions.depth}D cm`;
}

    //get review summary//
   getReviewSummary(): ReviewSummary {
    const summary: ReviewSummary = {positive: 0, neutral: 0, negative: 0};
    
    this.reviews.forEach(review => {
        if(review.rating >= 4) summary.positive++;
        else if(review.rating >= 3) summary.neutral++;
        else summary.negative++;
    });
    
    return summary;
}
}
