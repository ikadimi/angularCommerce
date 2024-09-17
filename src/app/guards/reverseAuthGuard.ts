import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (Boolean(isLoggedIn) === true) {
        this.router.navigate(['/']);
        return false;
      }

      return true
    }

    return true
  }
}
