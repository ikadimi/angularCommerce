import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressHeaderComponent } from './progress-header/progress-header.component';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, ProgressHeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  // Method to handle navigation to different steps
  // getRouterOutletState(outlet: RouterOutlet) {
  //   return outlet.isActivated ? outlet.activatedRoute : '';
  // }
  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() { 
    this.checkoutService.loadCheckoutData();
  }
}
