import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/products.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private baseUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) {}
    
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/products`);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
    }
};