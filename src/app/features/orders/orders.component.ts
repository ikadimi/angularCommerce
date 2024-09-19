import { Component } from '@angular/core';
import { OrderService } from './services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrderHistory().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status !== 404) {
          this.errorMessage = 'Failed to load order history';
        }
        this.isLoading = false;
      }
    });
  }
}
