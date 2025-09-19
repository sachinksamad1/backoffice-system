import { Component, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@backoffice-system/api-client';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  
  // Dependencies
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  
  // Component State
  public showPassword = false;
  public loading = false;
  public error: string | null = null;
  public appRole: 'admin' | 'manager' | 'staff' = 'staff';
  private isBrowser = false;
  private timer: ReturnType<typeof setTimeout> | undefined;

  // Form Group
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  } 

  ngOnInit() {
    if (this.isBrowser) {
      console.log('URL segments:', this.activatedRoute.snapshot.url); // Debug: Log URL segments
      this.appRole = this.activatedRoute.snapshot.url[0]?.path as 'admin' | 'manager' | 'staff' || 'staff';
      console.log('Assigned appRole:', this.appRole); // Debug: Log appRole
    }

    const token = this.authService.getAccessToken();
    if (token) {
      this.redirectUser(token);
    }
  }

  // Feature: Password Visibility
  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Feature: Auto-displaying Error Message
  private displayError(message: string, duration = 10000): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.error = message;
    this.timer = setTimeout(() => {
      this.error = null;
    }, duration);
  }

  async onLogin() {
    if (this.form.invalid) {
      this.displayError('Please enter a valid email and password.');
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.value;
    const success = await this.authService.login(email!, password!);
    this.loading = false;

    if (success) {
      const token = this.authService.getAccessToken();
      console.log('Token:', token); // Debugging line
      if (token) {
        this.redirectUser(token);
      }
    } else {
      this.displayError('Invalid email or password.');
    }
  }

  private redirectUser(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.role;

      if (userRole !== this.appRole) {
        this.authService.logout();
        console.log('User role mismatch:', userRole, this.appRole); // Debugging line
        this.displayError(`This is the ${this.appRole} portal. Please log in with a ${this.appRole} account.`);
        return;
      }

      if (userRole === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (userRole === 'manager') {
        this.router.navigate(['/tasks']);
      } else {
        this.router.navigate(['/attendance']);
      }

    } catch {
      this.displayError('Invalid token received.');
    }
  }
}