import { Component } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutData } from '../models/checkout.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  checkoutData: any;

  constructor(private checkoutService: CheckoutService, private router: Router) {}

  onConfirm() {
    this.checkoutService.resetOrderConfirmationState();
    this.router.navigate(['/']);
  }

  get orderConfirmationState() {
    return this.checkoutService.orderConfirmationState;
  }

  get orderConfirmationMessage() {
    return this.orderConfirmationState === 'CONFIRMED' ? 'Your order has been placed successfully!' : 'An error occurred while processing your order. Please try again later.';
  }

  ngOnInit() {
    this.checkoutService.checkoutData$.subscribe((data: CheckoutData | null) => {
      console.log('updated checkout data', data);
      this.checkoutData = data;
    })
  }

  confirmOrder() {
    this.checkoutService.confirmOrder();
  }
}
