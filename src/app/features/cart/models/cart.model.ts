import { ProductWithQuantity } from "../../products/models/products.model";

export interface CartItem {
    productId: string;
    price: number;
    quantity: number;
}

export interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    createdAt: Date;
}

export interface CartWithProductDetails  {
    items: ProductWithQuantity[];
    totalPrice: number;
}