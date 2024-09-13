import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductWithQuantity } from '../../products/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<ProductWithQuantity[]> {

  constructor(private cartService: CartService) {}

  resolve(): Observable<ProductWithQuantity[]> {
    // Fetch the cart before the route is activated
    return this.cartService.getCartWithProductDetails();
  }
}
