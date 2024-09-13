import { Component, Input } from '@angular/core';
import { ProductWithQuantity } from '../../../products/models/products.model';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-list',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  @Input() cartItems: ProductWithQuantity[] | undefined;
}
