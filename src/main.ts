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
