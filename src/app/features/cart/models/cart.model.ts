export interface CartItem {
    productId: string;
    name: string;
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

export type CartItemWithStock = CartItem & {stock: number};

export interface CartWithStocks extends Cart {
    items: CartItemWithStock[];
}