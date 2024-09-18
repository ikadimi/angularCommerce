import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product, ProductWithQuantity } from '../../products/models/products.model';
import { ProductsService } from '../../products/services/products.service';
import { Cart, CartWithProductDetails } from '../models/cart.model';
import { ApiWithNotificationService } from '../../../shared/services/api-with-notification.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = environment.cartEndpoint;

  // Subject to hold the cart state
  private cartSubject = new BehaviorSubject<CartWithProductDetails | null>(null);
  
  // Observable to expose the cart state
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private ApiWithNotificationSercice: ApiWithNotificationService, private productsService: ProductsService) {
    this.initCart();
  }


  // initialize the cart
  initCart(): Observable<any> {
    return this.getCartWithProductDetails();
  }

  // Fetch the cart and product details, then update the subject
  getCartWithProductDetails(): Observable<CartWithProductDetails> {
    return this.http.get<Cart>(`${this.cartUrl}`).pipe(
      switchMap(cart => {
        const productIds = cart.items.map(item => item.productId);
        return forkJoin(productIds.map(productId => this.productsService.getProduct(productId))).pipe(
          map(products => {
            const productWithDetails = cart.items.map(item => {
              const product = products.find(p => p._id === item.productId) as Product;
              return { ...product, quantity: item.quantity };
            });
            return { items: productWithDetails, totalPrice: cart.totalPrice};
          }),
          // Update the cartSubject whenever we get new cart data
          tap(cartWithDetails => this.cartSubject.next(cartWithDetails))
        );
      })
    );
  }

  // Add an item to the cart and update the subject
  addItemToCart(productId: string, quantity: number): Observable<any> {
    return this.ApiWithNotificationSercice.callApi(`${this.cartUrl}/add`, 'POST', { productId, quantity }).pipe(
      switchMap(() => this.getCartWithProductDetails())
    );
  }

  // Update the quantity of an item and refresh the cart
  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.ApiWithNotificationSercice.callApi(`${this.cartUrl}/update`, 'PUT', { productId, quantity }).pipe(
      switchMap(() => this.getCartWithProductDetails())
    );
  }

  // Remove an item from the cart and refresh the cart
  removeCartItem(productId: string): Observable<any> {
    return this.ApiWithNotificationSercice.callApi(`${this.cartUrl}/remove?productId=${productId}`, 'DELETE').pipe(
      switchMap(() => this.getCartWithProductDetails())
    )
  }

  clearCart() {
    this.cartSubject.next(null); // Clear the cart
  }
}
