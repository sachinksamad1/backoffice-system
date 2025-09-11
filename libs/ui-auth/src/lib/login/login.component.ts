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
  private fb = inject(FormBuilder);
  private router = inject(Router);
   private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loading = false;
  error: string | null = null;
  appRole: 'admin' | 'manager' | 'staff' = 'staff'; // default

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (location.pathname.includes('admin')) {
        this.appRole = 'admin';
      } else if (location.pathname.includes('manager')) {
        this.appRole = 'manager';
      } else {
        this.appRole = 'staff';
      }
    }

    // this.appRole = this.activatedRoute.snapshot.url[0].path as 'admin' | 'manager' | 'staff' || 'staff';

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
        this.authService.logout();
        this.error = `This is the ${this.appRole} portal. Please login with a ${this.appRole} account.`;
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
      this.error = 'Invalid token received';
    }
  }
}