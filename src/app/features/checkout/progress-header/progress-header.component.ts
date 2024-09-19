import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'progress-header',
  standalone: true,
  templateUrl: './progress-header.component.html',
  styleUrls: ['./progress-header.component.scss']
})
export class ProgressHeaderComponent implements OnInit {
  currentStep: number = 1;

  constructor(private router: Router, private route: ActivatedRoute, private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    // Subscribe to router events to get the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentStep();
    });

    // Initialize the step on component load
    this.updateCurrentStep();
  }

  canNavigateToStep(step: number): boolean {
    if (step === 2) {
      if (!this.checkoutService.getAddress()) {
        return false
      }
    }
    if (step === 3) {
      if (!this.checkoutService.getAddress() || !this.checkoutService.getPayment()) {
        return false
      }
    }

    return true
  }

  private updateCurrentStep(): void {
    // Use ActivatedRoute to get the current route's URL
    const childRoute = this.route.firstChild?.snapshot.url[0]?.path;
    this.currentStep = this.getStepFromUrlSegment(childRoute);
    console.log('step ==> ', childRoute, this.currentStep);
  }

  private getStepFromUrlSegment(urlSegment: string | undefined): number {
    switch (urlSegment) {
      case 'address': return 1;
      case 'payment': return 2;
      case 'confirmation': return 3;
      default: return 1;
    }
  }

  goToStep(step: number): void {
    if (!this.canNavigateToStep(step)) {
      return;
    }
    const stepPath = this.getPathFromStep(step);
    this.router.navigate([`/checkout/${stepPath}`]);
  }

  private getPathFromStep(step: number): string {
    switch (step) {
      case 1: return 'address';
      case 2: return 'payment';
      case 3: return 'confirmation';
      default: return 'address';
    }
  }
}
