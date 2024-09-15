import { Component, Input } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsModule } from '../../shared/products.module';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [ProductsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  constructor() { }
}
