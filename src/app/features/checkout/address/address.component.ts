import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private checkoutService: CheckoutService) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onNext() {
    if (this.addressForm.valid) {
      this.checkoutService.setAddress(this.addressForm.value);
      this.router.navigate(['checkout/payment']);
    }
  }
}
