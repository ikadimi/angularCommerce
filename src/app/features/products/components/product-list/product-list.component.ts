import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { ProductsModule } from '../../shared/products.module';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private imageUrl = environment.imageEndpoint;
  products: Product[] = [];
  constructor(private productsService: ProductsService) { }
  
  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }

  imageSrc(filename: string) {
    // add breakpoint check for the other size
    // const folder = this.breakpointObserver.isMatched(Breakpoints.Handset) ? '270x270' : '500x500';
    return `${this.imageUrl}/images/500x500/${filename}`;
  }
}
