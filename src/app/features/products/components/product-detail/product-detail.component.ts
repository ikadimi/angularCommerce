import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { ProductsModule } from '../../shared/products.module';
import { CartService } from '../../../cart/services/cart.service';
import { response } from 'express';

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
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.fetchProduct(this.productId!);
    });
  }

  imageSrc(filename: string) {
    return this.productsService.imageSrc(filename);
}

  fetchProduct(productId: string) {
    this.product$ = this.productsService.getProduct(productId);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addItemToCart(productId, quantity).subscribe((response) => {
      console.log(response);
    });
  }
}
