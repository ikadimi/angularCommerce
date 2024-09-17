import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressHeaderComponent } from './progress-header/progress-header.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, ProgressHeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  // Method to handle navigation to different steps
  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
