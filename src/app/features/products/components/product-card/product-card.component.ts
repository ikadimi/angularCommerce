import { Component, Input } from "@angular/core";
import { Product } from "../../models/products.model";
import { CommonModule } from "@angular/common";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { RouterModule } from "@angular/router";
import { ProductsService } from "../../services/products.service";

@Component({
    selector: "product-card",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent {
    @Input () product?: Product;

    constructor(private productsService: ProductsService) {}

    imageSrc(filename: string) {
        return this.productsService.imageSrc(filename);
    }
}