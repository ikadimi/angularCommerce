import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private checkoutService: CheckoutService) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  onNext() {
    if (this.paymentForm.valid) {
      this.checkoutService.setPayment(this.paymentForm.value);
      this.router.navigate(['checkout/confirmation']);
    }
  }
}
