import { Component } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutData } from '../models/checkout.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  checkoutData: any; 

  constructor(private checkoutService: CheckoutService) {}

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
