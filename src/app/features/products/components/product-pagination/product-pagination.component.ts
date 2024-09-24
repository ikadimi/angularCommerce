import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-pagination.component.html',
  styleUrl: './product-pagination.component.scss'
})
export class ProductPaginationComponent {
  @Input() currentPage: number = 1;  // Current active page
  @Input() totalItems: number = 0;    // Total number of items
  @Input() itemsPerPage: number = 9;  // Items per page
  @Output() pageChange = new EventEmitter<number>(); // Emit event on page change

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Ignore invalid pages
    }
    this.currentPage = page;
    this.pageChange.emit(this.currentPage); // Emit the new page number
  }
}
