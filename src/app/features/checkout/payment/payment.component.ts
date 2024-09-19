import { Component, OnInit } from '@angular/core';
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
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private checkoutService: CheckoutService) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit(): void {  
    const payment = this.checkoutService.getPayment();
    if (payment) {
      this.paymentForm.patchValue(payment);
    }
  }

  onNext() {
    if (this.paymentForm.valid) {
      this.checkoutService.setPayment(this.paymentForm.value);
      this.router.navigate(['checkout/confirmation']);
    }
  }
}
