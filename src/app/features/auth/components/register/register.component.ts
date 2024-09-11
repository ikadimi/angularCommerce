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
  // emailError: string | null = null;
  // passwordError: string | null = null;
  submissionSuccess: string | null = null;
  submissionError: string | null = null;
  isSubmitting = false;

  constructor(private authService: AuthService) {}

  register() {
    this.isSubmitting = true;
    this.authService.register(this.userRegistration).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submissionSuccess = 'Registration successful! Please go to the Login page.';
        this.submissionError = null;
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submissionError = error.error.message;
        this.submissionSuccess = null;
      }
    });
  }
}
