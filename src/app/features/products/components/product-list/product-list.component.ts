import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { ProductsModule } from '../../shared/products.module';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService) { }
  
  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }
}
