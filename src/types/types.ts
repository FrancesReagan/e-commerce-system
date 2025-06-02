
//src/types/types.ts//
//Product-related interfaces//
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

//API Response interfaces//
export interface ProductsResponse {
  products: ProductData[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoriesResponse {
  categories: string[];
}

//error types//
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

//price calculation types//
export interface PriceBreakdown {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

//Review summary type//
export interface ReviewSummary {
  positive: number;
  neutral: number;
  negative: number;
}

//Search parameters//
export interface SearchParams {
  query: string;
  limit?: number;
  skip?: number;
}

//filter parameters//
export interface FilterParams {
  category?: string;
  minPrice? : number;
  maxPrice? : number;
  inStock? : number;
}