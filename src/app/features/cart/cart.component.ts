import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { RouterModule } from '@angular/router';
import { CartWithStocks } from './models/cart.model';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartListComponent, RouterModule, CartTotalComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent{
  cart: CartWithStocks | null = null;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }
}
