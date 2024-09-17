import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isAuthenticated = !!localStorage.getItem('loggedIn');
    }
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
