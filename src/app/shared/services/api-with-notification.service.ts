import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../components/notification/services/notification.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

@Injectable({
  providedIn: 'root',
})
export class ApiWithNotificationService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  callApi<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any): Observable<T> {
    let request: Observable<ApiResponse<T>>;

    switch (method) {
      case 'POST':
        request = this.http.post<ApiResponse<T>>(url, body);
        break;
      case 'PUT':
        request = this.http.put<ApiResponse<T>>(url, body);
        break;
      case 'DELETE':
        request = this.http.delete<ApiResponse<T>>(url);
        break;
      default:
        request = this.http.get<ApiResponse<T>>(url);
        break;
    }

    return request.pipe(
      tap((response: ApiResponse<T>) => {
        if (response.success) {
          this.notificationService.showSuccess(response.message);
        }
      }),
      map((response: ApiResponse<T>) => response.data as T),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Something went wrong. Please try again later.';
        this.notificationService.showError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
