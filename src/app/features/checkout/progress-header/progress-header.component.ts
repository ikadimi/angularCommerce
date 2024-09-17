import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-header',
  standalone: true,
  templateUrl: './progress-header.component.html',
  styleUrls: ['./progress-header.component.scss']
})
export class ProgressHeaderComponent implements OnInit {
  // make the step an input for the checkout where i take it from the url
  currentStep: number = 1;

  constructor() {}

  ngOnInit(): void {
    // Load current step from localStorage if exists

    const savedStep = localStorage.getItem('checkoutStep');
    if (savedStep) {
      this.currentStep = parseInt(savedStep, 10);
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
    // Save the current step to localStorage
    localStorage.setItem('checkoutStep', step.toString());
  }
}
