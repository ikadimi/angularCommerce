import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductWithQuantity } from '../../../products/models/products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss'
})
export class CartTotalComponent {
  @Input() cartItems: ProductWithQuantity[] | undefined;

  constructor() {}

  get total() {
    return this.cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  }
}
