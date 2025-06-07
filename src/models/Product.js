"use strict";
//src/models/Product.ts/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(data) {
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
    displayDetails() {
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
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getCategory() {
        return this.category;
    }
    getPrice() {
        return this.price;
    }
    getDiscountPercentage() {
        return this.discountPercentage;
    }
    getRating() {
        return this.rating;
    }
    getStock() {
        return this.stock;
    }
    getTags() {
        return this.tags;
    }
    getBrand() {
        return this.brand;
    }
    getSku() {
        return this.sku;
    }
    getWeight() {
        return this.weight;
    }
    getDimensions() {
        return this.dimensions;
    }
    getWarrantyInformation() {
        return this.warrantyInformation;
    }
    getShippingInformation() {
        return this.shippingInformation;
    }
    getAvailabilityStatus() {
        return this.availabilityStatus;
    }
    getReviews() {
        return this.reviews;
    }
    getReturnPolicy() {
        return this.returnPolicy;
    }
    getMinimumOrderQuantity() {
        return this.minimumOrderQuantity;
    }
    getMeta() {
        return this.meta;
    }
    getThumbnail() {
        return this.thumbnail;
    }
    getImages() {
        return this.images;
    }
    // calculate price with discount//
    getPriceWithDiscount() {
        const discountAmount = (this.price * this.discountPercentage) / 100;
        return this.price - discountAmount;
    }
    //additional utility methods//
    //check if product is in stock//
    isInStock() {
        return this.stock > 0;
    }
    //check if product is low in stock//
    isLowStock() {
        return this.availabilityStatus.toLowerCase().includes('low');
    }
    //get average review rating//
    getAverageReviewRating() {
        if (this.reviews.length === 0)
            return 0;
        const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / this.reviews.length;
    }
    //get total volume of product//
    getVolume() {
        return this.dimensions.width * this.dimensions.height * this.dimensions.depth;
    }
    //check if product has a specific tag//
    hasTag(tag) {
        return this.tags.some(t => t.toLowerCase() === tag.toLowerCase());
    }
    //get formatted dimensions string//
    getFormattedDimensions() {
        return `${this.dimensions.width}W x ${this.dimensions.height}H x ${this.dimensions.depth}D cm`;
    }
    //get review summary//
    getReviewSummary() {
        const summary = { positive: 0, neutral: 0, negative: 0 };
        this.reviews.forEach(review => {
            if (review.rating >= 4)
                summary.positive++;
            else if (review.rating >= 3)
                summary.neutral++;
            else
                summary.negative++;
        });
        return summary;
    }
}
exports.Product = Product;
