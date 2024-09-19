import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = environment.ordersEndpoint; 

  constructor(private http: HttpClient) {}

  getOrderHistory(): Observable<any[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }
}
