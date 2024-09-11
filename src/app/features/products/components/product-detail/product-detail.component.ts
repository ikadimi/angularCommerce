import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { ProductsModule } from '../../shared/products.module';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId?: string;
  product$: Observable<Product> | undefined;
  subscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.fetchProduct(this.productId!);
    });
  }

  fetchProduct(productId: string) {
    this.product$ = this.productsService.getProduct(productId);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
