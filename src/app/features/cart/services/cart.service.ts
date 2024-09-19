import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Cart, CartWithStocks } from '../models/cart.model';
import { ApiWithNotificationService } from '../../../shared/services/api-with-notification.service';
import { ProductsService } from '../../products/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = environment.cartEndpoint;

  private cartSubject = new BehaviorSubject<CartWithStocks | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient,
    private ApiWithNotificationSercice: ApiWithNotificationService,
    private productService: ProductsService) {
    this.getCart().subscribe();
  }

  // Fetch the cart and product details, then update the subject
  getCart(): Observable<CartWithStocks | null> {
    return this.http.get<Cart>(this.cartUrl).pipe(
        switchMap(cart => {
          if (cart.items.length === 0) {
            // Return null if the cart is empty
            return of(null);
          }
          const productRequests = cart.items.map(item =>
            this.productService.getProduct(item.productId)
              .pipe(map(product => ({
                ...item,
                stock: product.stock
              })))
          );
          return forkJoin(productRequests).pipe(
            map(itemsWithStock => ({
              ...cart,
              items: itemsWithStock
            }))
          )
        }),
        tap((cart) => this.cartSubject.next(cart))
    )
  }

  // Add an item to the cart and update the subject
  addItemToCart(productId: string, quantity: number): Observable<any> {
    return this.ApiWithNotificationSercice.callApi(`${this.cartUrl}/add`, 'POST', { productId, quantity }).pipe(
      switchMap(() => this.getCart())
    );
  }

  // Update the quantity of an item and refresh the cart
  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.ApiWithNotificationSercice.callApi(`${this.cartUrl}/update`, 'PUT', { productId, quantity }).pipe(
      switchMap(() => this.getCart())
    );
  }

  // Remove an item from the cart and refresh the cart
  removeCartItem(productId: string): Observable<any> {
    return this.ApiWithNotificationSercice.callApi(`${this.cartUrl}/remove?productId=${productId}`, 'DELETE').pipe(
      switchMap(() => this.getCart())
    )
  }

  clearCart() {
    this.cartSubject.next(null); // Clear the cart
  }
}
