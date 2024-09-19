// not used anymore it sucks :)
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<Cart> {

  constructor(private cartService: CartService) {}

  resolve(): Observable<Cart> {
    // Fetch the cart before the route is activated
    return this.cartService.getCart();
  }
}
