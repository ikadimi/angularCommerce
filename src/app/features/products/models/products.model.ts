export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    rating: number;
    reviews: number;
    image: string;
    stock: number;
    features: string[];
  }