import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { AuthGuard } from './guards/authGuard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cart', canActivate: [AuthGuard], component: CartComponent},
    {path: '**', redirectTo: ''}
];
