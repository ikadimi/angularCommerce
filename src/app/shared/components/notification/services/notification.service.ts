// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  getNotification() {
    return this.notificationSubject.asObservable();
  }

  showSuccess(message: string) {
    this.notificationSubject.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.notificationSubject.next({ message, type: 'error' });
  }
}