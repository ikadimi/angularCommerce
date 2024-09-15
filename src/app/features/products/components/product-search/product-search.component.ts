import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'product-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  @Output() filtersChange = new EventEmitter<any>();
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;

  constructor(private route: ActivatedRoute) {
    this.searchTerm = this.route.snapshot.queryParams['searchTerm'] || '';
    this.category = this.route.snapshot.queryParams['category'] || '';
    this.minPrice = this.route.snapshot.queryParams['minPrice'] || 0;
    this.maxPrice = this.route.snapshot.queryParams['maxPrice'] || 1000;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.category = '';
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.onFilterChange();
  }
  onFilterChange(): void {
    this.filtersChange.emit({
      searchTerm: this.searchTerm,
      category: this.category,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }
}
