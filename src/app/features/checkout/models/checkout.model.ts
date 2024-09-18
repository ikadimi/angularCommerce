export interface CheckoutData {
    deliveryAddress: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: {
      name: string;
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    };
  }