import { Component, Input } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { CartItemWithStock } from '../../models/cart.model';

@Component({
  selector: 'cart-list',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  @Input() cartItems: CartItemWithStock[] | undefined;
}
