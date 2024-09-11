import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
];
