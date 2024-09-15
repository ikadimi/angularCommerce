import { Component, OnInit } from '@angular/core';
import { Product, SearchQuery } from './models/products.model';
import { ProductsService } from './services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductSearchComponent, ProductListComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['searchTerm'] || '';
      const category = params['category'] || '';
      const minPrice = params['minPrice'] || 0;
      const maxPrice = params['maxPrice'] || 1000;

      // Fetch products based on the query params
      this.searchProducts({ searchTerm, category, minPrice, maxPrice });
    });
  }

  onFiltersChanged(filters: Event): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge', // merge with existing query params
    });

    this.searchProducts(filters as SearchQuery);
  }

  searchProducts(filters: SearchQuery): void {
    this.productService.getFilteredProducts(filters).subscribe(products => {
      this.products = products;
    });
  }
}
