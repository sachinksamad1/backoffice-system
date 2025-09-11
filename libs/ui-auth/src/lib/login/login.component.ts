import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@backoffice-system/api-client';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
   private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loading = false;
  error: string | null = null;
  appRole: 'admin' | 'manager' | 'staff' = 'staff'; // default

  ngOnInit() {
    // Detect which app is running based on pathname
    if (location.pathname.includes('admin')) {
      this.appRole = 'admin';
    } else if (location.pathname.includes('manager')) {
      this.appRole = 'manager';
    } else {
      this.appRole = 'staff';
    }

    const token = this.authService.getAccessToken();
    if (token) {
      this.redirectUser(token);
    }
  }

  async onLogin() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.value;
    const success = await this.authService.login(email!, password!);
    this.loading = false;

    if (success) {
      const token = this.authService.getAccessToken();
      if (token) {
        this.redirectUser(token);
      }
    } else {
      this.error = 'Invalid email or password';
    }
  }

  private redirectUser(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.role;

      if (userRole !== this.appRole) {
        // Role mismatch → deny access
        this.authService.logout();
        this.error = `This is the ${this.appRole} portal. Please login with a ${this.appRole} account.`;
        return;
      }

      // Redirect based on role
      if (userRole === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (userRole === 'manager') {
        this.router.navigate(['/tasks']);
      } else {
        this.router.navigate(['/attendance']);
      }

    } catch {
      this.error = 'Invalid token received';
    }
  }
}