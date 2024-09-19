import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CheckoutData } from '../models/checkout.model';

enum OrderConfirmationState {
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  ERROR = 'ERROR'
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutUrl = environment.checkoutEndpoint;
  private checkoutDataSubject = new BehaviorSubject<CheckoutData | null>(null)
  public checkoutData$ = this.checkoutDataSubject.asObservable();
  public orderConfirmationState: OrderConfirmationState = OrderConfirmationState.NOT_CONFIRMED;

  private storageKey = 'checkoutData';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  confirmOrder() {
    console.log('order confirmed')
    this.orderConfirmationState = OrderConfirmationState.CONFIRMING;
    // Send checkout data to server
    this.http.post(this.checkoutUrl, this.checkoutDataSubject.getValue()).subscribe({
      next: (res) => {
        this.orderConfirmationState = OrderConfirmationState.CONFIRMED;
        this.clearCheckout();
        console.log(res);
      },
      error: (err) => {
        this.orderConfirmationState = OrderConfirmationState.ERROR;
        this.clearCheckout();
        console.error(err);
      }
    });
  }

  clearCheckout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.storageKey)
    }
  }

  resetOrderConfirmationState() {
    this.orderConfirmationState = OrderConfirmationState.NOT_CONFIRMED;
  }

  // Save delivery address and payment method to sessionStorage
  saveCheckoutData() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(this.checkoutDataSubject.getValue()));
    }
  }

  // Load checkout data from sessionStorage
  loadCheckoutData() {
    if (isPlatformBrowser(this.platformId)) {
      const checkoutData = sessionStorage.getItem(this.storageKey);
      this.checkoutDataSubject.next(checkoutData ? JSON.parse(checkoutData) : null);
    }
  }

  // Clear checkout data from sessionStorage
  clearCheckoutData() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.storageKey);
    }
  }

  setAddress(data: any) {
    this.checkoutDataSubject.next(
      Object.assign({}, this.checkoutDataSubject.getValue(), { deliveryAddress: data })
    );
    this.saveCheckoutData();
  }

  getAddress() {
    return this.checkoutDataSubject.getValue()?.deliveryAddress;
  }

  setPayment(data: any) {
    this.checkoutDataSubject.next(
      Object.assign({}, this.checkoutDataSubject.getValue(), { paymentMethod: data })
    );
    this.saveCheckoutData();
  }

  getPayment() {
    return this.checkoutDataSubject.getValue()?.paymentMethod;

  }
}
