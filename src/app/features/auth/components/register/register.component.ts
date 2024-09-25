import { Component } from '@angular/core';
import { AuthModule } from '../../shared/auth.module';
import { AuthService } from '../../services/auth.service';
import { RegisterationForm } from '../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userRegistration: RegisterationForm = { username: '', email: '', password: '' };
  isSubmitting = false;

  constructor(private authService: AuthService) {}

  register() {
    this.isSubmitting = true;
    this.authService.register(this.userRegistration).subscribe({
      next: () => {
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
