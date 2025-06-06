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
  
