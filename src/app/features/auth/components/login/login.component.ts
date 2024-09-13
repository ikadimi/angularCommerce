import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthModule } from '../../shared/auth.module';
import { LoginForm } from '../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userLogin: LoginForm = { email: '', password: '' };
  submissionSuccess: string | null = null;
  submissionError: string | null = null;
  isSubmitting = false;

  constructor(private authService: AuthService) { }

  login() {
    this.isSubmitting = true;
    this.authService.login(this.userLogin).subscribe({
      next: (response: any) => {
        console.log({...response})
        this.isSubmitting = false;
        this.submissionSuccess = 'Login successful!';
        this.submissionError = null;
        // setting the token in local storage
        // localStorage.setItem('jwtToken', response.token);
      },
      error: (error) => {
        console.log(error)
        this.isSubmitting = false;
        this.submissionError = error.error.message;
        this.submissionSuccess = null;
      }
    });
  }
}
