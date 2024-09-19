import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  // Input to control if the modal shows a close button
  @Input() closeButton: boolean = true;

  // Output event emitter to notify parent when modal is closed
  @Output() modalClose = new EventEmitter<void>();

  // Method to emit close event
  closeModal() {
    this.modalClose.emit();
}
}
