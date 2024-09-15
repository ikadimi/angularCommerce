import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product, SearchQuery } from "../models/products.model";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private baseUrl = environment.catalogEndpoint;
    private imageUrl = environment.imageEndpoint;

    constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver) {}
    
    imageSrc(filename: string) {
      // add breakpoint check for the other size
      const folder = this.breakpointObserver.isMatched(Breakpoints.Handset) ? '270x270' : '500x500';
      return `${this.imageUrl}/images/${folder}/${filename}`;
    }
    
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/products`);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
    }

    getFilteredProducts(searchQuery: SearchQuery): Observable<Product[]> {
        const { searchTerm, category, minPrice, maxPrice } = searchQuery;

        let params = new HttpParams();
    
        if (searchTerm) {
          params = params.set('searchTerm', searchTerm);
        }
        if (category) {
          params = params.set('category', category);
        }
        if (minPrice && maxPrice) {
          params = params.set('minPrice', minPrice.toString());
          params = params.set('maxPrice', maxPrice.toString());
        }
    
        return this.http.get<Product[]>(`${this.baseUrl}/products`, { params });
      }
};