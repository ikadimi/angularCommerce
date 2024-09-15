import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.user;
    if (user) {
      // User is logged in, allow access
      return true;
    }

    // User is not logged in, redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
