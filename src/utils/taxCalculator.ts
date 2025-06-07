
import { PriceBreakdown } from "../types/types";

// 4.75% default tax rate//
const DEFAULT_TAX_RATE = 4.75;
//3% tax rate for groceries//
const GROCERY_TAX_RATE = 3.0;

// calculate the tax amount for a product --- //
// @param price - price of the product (after any discounts)//
// @param category - product category//
// @returns the dollar amount that the product is taxed at //

export function calculateTax(price:number, category:string):number{
  if (price < 0){
    throw new Error("Price cannot be negative");
  }
  const taxRate = getTaxRate(category);
  return (price*taxRate) / 100;
}

// get the tax rate based on product category--//
// @param category - product category//
// @returns tax rate as a percentage//

export function getTaxRate(category:string):number{
  const normalizedCategory = category.toLowerCase().trim();

  if(normalizedCategory === "groceries"){
    return GROCERY_TAX_RATE;
  }
  return DEFAULT_TAX_RATE;
}

// calculate the final price including tax//
// @param price - price before tax//
//@param category - product category//
//@returns final price including tax//

export function calculatePriceWithTax(price:number, category:string):number{
  const taxAmount = calculateTax(price, category);
  return price + taxAmount;
}

// get a breakdown of price,tax, and total//
//@param price -price before tex//
//@param category - product category//
//@returns object containing price breakdown//

export function getPriceBreakdown(price:number, category:string):PriceBreakdown {
  const taxRate = getTaxRate(category);
  const taxAmount = calculateTax(price, category);
  const total = price + taxAmount;

return {
  subtotal: price,
  taxRate,
  taxAmount,
  total
};
}
