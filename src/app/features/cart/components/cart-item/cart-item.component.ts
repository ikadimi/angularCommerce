import { Component, Input, OnInit } from '@angular/core';
import { ProductWithQuantity } from '../../../products/models/products.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: ProductWithQuantity;
  quantity: number = 0;
  availableQuantities: number[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = this.cartItem?.quantity || 1;
    this.availableQuantities = Array.from({ length: this.cartItem?.stock }, (_, i) => i + 1);
  }

  onQuantityChange(productId: string, quantity: number) {
    console.log(productId, quantity);
    this.cartService.updateCartItem(productId, quantity).subscribe(console.log);
  }

  removeFromCart(productId: string) {
    console.log(productId);
    this.cartService.removeCartItem(productId).subscribe(console.log)
  }
}
