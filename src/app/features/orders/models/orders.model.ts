export interface Order {
    _id: string;
    userId: string;
    items: Array<{
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    deliveryAddress: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentStatus: 'Paid' | 'Pending' | 'Failed';
    totalPrice: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'; 
    createdAt: Date;
}
