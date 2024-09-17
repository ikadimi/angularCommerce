// notification.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string | null = null;
  type: 'success' | 'error' | null = null;
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotification().subscribe((notification) => {
      this.message = notification.message;
      this.type = notification.type;
      
      // Auto close the notification after 3 seconds
      setTimeout(() => this.close(), 3000);
    });
  }

  close(): void {
    this.message = null;
    this.type = null;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
