import { ApiService } from "./services/apiService";
import { Product} from "./models/Product";
import { calculateDiscount,formatPrice } from "./utils/discountCalculator";
import { calculateTax, getPriceBreakdown} from "./utils/taxCalculator";
import { handleError, ApiError, ValidationError } from "./utils/errorHandler";

class ECommerceApp {
  private products: Product[] = [];

  constructor() {
    console.log("E-Commerce System Starting...\n");
  }

  // initialize the application//
  async init(): Promise<void> {
    try {
      // fetch and display all products//
      await this.fetchAndDisplayProducts();

      // demonstrate single product fetch//
      await.this.demonstrateSingleProductFetch();
      // demonstrate search functionality//
      await this.demonstrateSearch();
      // demonstrate category filtering//
      await this.demonstrateCategoryFilter();
      // demonstrate tax calculations//
      await this.demonstrateTaxCalculations();
      // deomonstrate error handling//
      await this.demonstrateErrorHandling();
    } catch(error){
      handleError(error);
    }
  }
  // fetch and display all products//
  private async fetchAndDisplayProducts(): Promise<void> {
    console.log("Fetching all products...\n");
    try{
      // fetch 10 products for demo//
      this.products = await this.ApiService.getAllProducts(10);
      console.log(`Found ${this.products.length} products:\n`);

      this.products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.getTitle()} - ${formatPrice(product.getPrice())}`);
      });

      console.log("\n" + "=".repeat(50) + "\n");
    } catch (error) {
      throw error;
    }
  }

  // demonstrate fetching a single product//
  private async demonstrateSingleProductFetch(): Promise<void>{
    console.log("Fetching single product (ID:1)...\n");

    try {
      const product = await this.ApiService.getProductById(1);
      console.log(product.displayDestails());

      // show discount calculation//
      const discountAmount = calculateDiscount(product.getPrice(),
    product.getDiscountPercentage());

    console.log(`Discount amount: ${formatPrice(discountAmount)}`);
    console.log("\n" + "=".repeat(50) + "\n");
    } catch (error) {
      throw.error;
    }
  }
  // demonstrate search functinality//
  private async demonstrateSearch(): Promise<void>{
    console.log('Searching for "phone"...\n');

    try {
      const searchResults = await this.ApiService.searchProducts("phone");

      if(searchResults.length === 0){
        console.log("No products found.");
      } else {
        console.log(`Found ${searchResults.length}products:\n`);

        searchResults.forEach(product => {
          console.log(`-${product.getTitle()}(${product.getBrand()})- ${formatPrice(product.getPrice())}`);
      });
    }

    console.log("\n" + "=".repeat(50) + "\n");
  } catch (error) {
    throw error;
  }    
  // demonstrate category filtering//
  private async demonstrateCategoryFilter(): Promise<void>{
    console.log("Fetching products by category...\n");

    try{
      // first get all categories//
      const categories = await this.ApiService.searchCategories();
      console.log(`Available categories: ${categories.slice(0,5).join(",")}...\n`);

      // fetch products from a specific category//
      const category = "smartphones";
      console.log(`Fetching products from "${category}" category:\n`);

      const categoryProducts = await this.ApiService.getProductsByCategory(category);

      categoryProducts.slice(0,3).forEach(product=>{
        console.log(`-${product.getTile()}-${formatPrice(product.getPrice())}`);
      });
      console.log("\n" + "=".repeat(50)+ "\n");
    } catch (error) {
      throw error; 
    }
    }

    // demonstrate tax calculations//
    private async demonastrateTaxCalculations(): Promise<void>{
      console.log("Demonstrating tax calculations...\n");

      if(this.products.length === 0){
        console.log("No products available for tax demonstration.");
        return;
      }
    }
  }
