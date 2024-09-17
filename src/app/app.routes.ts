import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { AuthGuard } from './guards/authGuard';
import { ReverseAuthGuard } from './guards/reverseAuthGuard';
import { AddressComponent } from './features/checkout/address/address.component';
import { PaymentComponent } from './features/checkout/payment/payment.component';
import { ConfirmationComponent } from './features/checkout/confirmation/confirmation.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'register', component: RegisterComponent, canActivate: [ReverseAuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard]},
    {path: 'cart', canActivate: [AuthGuard], component: CartComponent},
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'address', component: AddressComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'confirmation', component: ConfirmationComponent },
          { path: '', redirectTo: 'address', pathMatch: 'full' }
        ]
    },
    {path: '**', redirectTo: ''}
];
