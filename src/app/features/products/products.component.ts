import { Component, OnInit } from '@angular/core';
import { Product, SearchQuery } from './models/products.model';
import { ProductsService } from './services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { removeEmptyFields } from '../../shared/helpers/removeEmptyFields';
import { ProductPaginationComponent } from "./components/product-pagination/product-pagination.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductSearchComponent, ProductListComponent, CommonModule, ProductPaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 9;
  currentPage: number = 1;
  brands: string[] = [];
  categories: string[] = [];
  minPrice?: number;
  maxPrice?: number;

  constructor(private productService: ProductsService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productService.getFilters().subscribe(backendFilters => {
      this.brands = backendFilters.brands || [];
      this.categories = backendFilters.categories || [];
      this.minPrice = backendFilters.minPrice || undefined;
      this.maxPrice = backendFilters.maxPrice || undefined;

      this.route.queryParams.subscribe(params => {
        const searchTerm = params['searchTerm'] || backendFilters.searchTerm;
        const category = params['category'] || backendFilters.category;
        const brand = params['brand'] || backendFilters.brand;
        const minPrice = params['minPrice'];
        const maxPrice = params['maxPrice'];
        this.currentPage = params['page'] || 1;
  
        const combinedFilters = {
          searchTerm,
          category,
          brand,
          minPrice,
          maxPrice,
        };
  
        const filteredFilters = Object.fromEntries(
          Object.entries(combinedFilters).filter(([_, value]) => value != null)
        );
        
        this.searchProducts(filteredFilters);
      });
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.router.navigate([], { queryParams: { page: this.currentPage }, queryParamsHandling: 'merge' });
  }

  onFiltersChanged(filters: Event): void {
    const newFilters = removeEmptyFields(filters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'replace', // replace the existing query params
    });
  }

  searchProducts(filters: SearchQuery): void {
    this.productService.getFilteredProducts(this.currentPage, filters).subscribe(productsResponse => {
      this.products = productsResponse.products;
      this.totalItems = productsResponse.total;
      this.itemsPerPage = productsResponse.limit;
      this.currentPage = productsResponse.page;
    });
  }
}
