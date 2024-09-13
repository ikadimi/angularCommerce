import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { ProductWithQuantity } from '../products/models/products.model';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartListComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent{
  cartItems: ProductWithQuantity[] = [];
  constructor(private cartService: CartService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the cart items from the resolved data
    this.cartItems = this.route.snapshot.data['cartItems'];


    // it doesn't update on delete check to do it better
  }
}
