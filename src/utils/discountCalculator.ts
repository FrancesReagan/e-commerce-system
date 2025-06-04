
//calculate the discount amount for a project//
//@parameter price - originial price of the product//
//@parameter discountPercentage - discount percentageto apply//
//@returns the dollar amojunt that the product is discounted by//

export function calculateDiscount(price: number, discountPercentage: number): {
  if (price < 0){
    throw new Error("Price cannot be negative");
  }

  if (discountPercentage < 0 || discountPercentage > 100){
    throw new Error("Discount percentage must be between 0 and 100");
  }
  return (price * discountPercentage) / 100;
}

// calculate the final price after applying discount//
// @parameter price -original price of the product//
// @parameter discountPercentage - discount percentage to apply//
// @returns the final price after discount//

export function calculateFinalPrice(price: number, discountPercentage:number):number {
  const discountAmount = calculateDiscount(price, discountPercentage);
  return price - discountAmount;
}

// format price for display//
// @parameter price - price to format//
// @parametr currencySymbol - Currency symbol  (default:$)
// @returns formatted price string//

export function formatPrice(price: number, currencySymbol: string = "$": string {
  return `${currencySymbol}${price.toFixed(2)}`;
}

// calculate savings percentage compared to original price//
// @parameter originalPrice - Original price//
// @parameter finalPrice - final price after discount//
// @returns Savings percentage//

export function calculateSavingsPercentage(originalPrice:number, finalPrice:number):number {
  number {
    if (originalPrice < 0){
      return 0;
    }

  const savings = originalPrice - finalPrice;
  return(savings / originalPrice) * 100;
  }
