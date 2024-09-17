import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  order = {
    id: '12345',
    shippingAddress: '123 Main St, Anytown USA',
    totalAmount: '$100.00'
  };

  constructor(private router: Router) {}

  onFinish() {
    // Finalize order and navigate to another page if needed
    // e.g., redirect to homepage or show order summary
    this.router.navigate(['/']);
  }
}
