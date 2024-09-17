import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { ProductWithQuantity } from '../products/models/products.model';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { RouterModule } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartListComponent, RouterModule, CartTotalComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent{
  cartItems: ProductWithQuantity[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.initCart().subscribe();
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }
}
