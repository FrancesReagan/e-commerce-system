"use strict";
//calculate the discount amount for a product//
//@parameter price - originial price of the product//
//@parameter discountPercentage - discount percentage to apply//
//@returns the dollar amount that the product is discounted by//
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = calculateDiscount;
exports.calculateFinalPrice = calculateFinalPrice;
exports.formatPrice = formatPrice;
exports.calculateSavingsPercentage = calculateSavingsPercentage;
function calculateDiscount(price, discountPercentage) {
    if (price < 0) {
        throw new Error("Price cannot be negative");
    }
    if (discountPercentage < 0 || discountPercentage > 100) {
        throw new Error("Discount percentage must be between 0 and 100");
    }
    return (price * discountPercentage) / 100;
}
// calculate the final price after applying discount//
// @parameter price -original price of the product//
// @parameter discountPercentage - discount percentage to apply//
// @returns the final price after discount//
function calculateFinalPrice(price, discountPercentage) {
    const discountAmount = calculateDiscount(price, discountPercentage);
    return price - discountAmount;
}
// format price for display//
// @parameter price - price to format//
// @parameter currencySymbol - Currency symbol  (default:$)
// @returns formatted price string//
function formatPrice(price, currencySymbol = "$") {
    return `${currencySymbol}${price.toFixed(2)}`;
}
// calculate savings percentage compared to original price//
// @parameter originalPrice - Original price//
// @parameter finalPrice - final price after discount//
// @returns Savings percentage//
function calculateSavingsPercentage(originalPrice, finalPrice) {
    if (originalPrice <= 0) {
        return 0;
    }
    const savings = originalPrice - finalPrice;
    return (savings / originalPrice) * 100;
}
