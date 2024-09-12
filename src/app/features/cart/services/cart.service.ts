import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class CartService {
    private baseUrl = environment.cartEndpoint;

    constructor(private http: HttpClient) {}
  
    addItemToCart(productId: string, quantity: number) {
      return this.http.post(`${this.baseUrl}/add`, { productId, quantity });
    }
  
    updateCartItem(productId: string, quantity: number) {
      return this.http.put(`${this.baseUrl}/update`, { productId, quantity });
    }
  
    removeCartItem(productId: string) {
      return this.http.delete(`${this.baseUrl}/remove`, { productId } as any);
    }
  }
  