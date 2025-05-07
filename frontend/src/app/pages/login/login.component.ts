import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        this.router.navigate(['/']);
      } catch (error) {
        this.errorMessage = 'Invalid email or password';
      }
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
