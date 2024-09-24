import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'product-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  @Output() filtersChange = new EventEmitter<any>();
  @Input() brands: string[] = [];
  @Input() categories: string[] = [];
  @Input() minPrice?: number = undefined;
  @Input() maxPrice?: number = undefined;

  searchTerm: string = '';
  category: string = '';
  brand: string = '';
  
  // Bind the selected values
  selectedMinPrice?: number = this.minPrice;
  selectedMaxPrice?: number = this.maxPrice;

  private filterChangeSubject = new Subject<any>();

  constructor(private route: ActivatedRoute) {
    this.filterChangeSubject.pipe(debounceTime(300)).subscribe(() => {
      this.updateFilters();
    });
    // Initialize filters from the URL params if present
    this.searchTerm = this.route.snapshot.queryParams['searchTerm'] || '';
    this.category = this.route.snapshot.queryParams['category'] || '';
    this.brand = this.route.snapshot.queryParams['brand'] || '';
    this.selectedMinPrice = +this.route.snapshot.queryParams['minPrice'] || this.minPrice;
    this.selectedMaxPrice = +this.route.snapshot.queryParams['maxPrice'] || this.maxPrice;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.category = '';
    this.brand = '';
    this.selectedMinPrice = undefined;
    this.selectedMaxPrice = undefined;
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.filterChangeSubject.next(this.getCurrentFilters());
  }

  private getCurrentFilters() {
    return {
      searchTerm: this.searchTerm,
      category: this.category,
      brand: this.brand,
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice,
    };
  }

  private updateFilters(): void {
    this.filtersChange.emit(this.getCurrentFilters());
  }
}
