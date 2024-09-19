import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem, CartItemWithStock } from '../../models/cart.model';
import { NotificationService } from '../../../../shared/components/notification/services/notification.service';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartItemWithStock;
  quantity: number = 0;
  availableQuantities: number[] = [];
  constructor(private cartService: CartService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.quantity = this.cartItem?.quantity || 1;
    this.availableQuantities = Array.from({ length: this.cartItem?.stock }, (_, i) => i + 1);
  }

  onQuantityChange(productId: string, quantity: number) {
    if (quantity > this.cartItem?.stock || quantity < 1) {
      this.quantity = this.cartItem?.stock;
      this.notificationService.showError(`Only ${this.cartItem?.stock} available`);
      return ;
    }
    console.log(productId, quantity);
    this.cartService.updateCartItem(productId, quantity).subscribe(console.log);
  }

  removeFromCart(productId: string) {
    console.log(productId);
    this.cartService.removeCartItem(productId).subscribe(console.log)
  }
}
