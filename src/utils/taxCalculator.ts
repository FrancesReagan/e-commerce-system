Import {PriceBreakdown} from "src/models/types/types";
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
}

