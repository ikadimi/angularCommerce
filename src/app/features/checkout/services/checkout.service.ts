import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private addressData: any = {};
  private paymentData: any = {};

  setAddress(data: any) {
    this.addressData = data;
  }

  getAddress() {
    return this.addressData;
  }

  setPayment(data: any) {
    this.paymentData = data;
  }

  getPayment() {
    return this.paymentData;
  }
}
