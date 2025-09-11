import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@backoffice-system/api-client';

@Component({
  selector: 'lib-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="logout()" class="logout-btn">
      Logout
    </button>
  `,
  styles: [`
    .logout-btn {
      padding: 8px 16px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .logout-btn:hover {
      background: #c82333;
    }
  `]
})
export class LogoutComponent {
 private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    const token = this.authService.getAccessToken();
    let role: string | null = null;

    if (token) {
      try {
        // Decode JWT payload (simple base64 decode)
        const payload = JSON.parse(atob(token.split('.')[1]));
        role = payload.role;
      } catch {
        role = null;
      }
    }

    // Clear tokens
    this.authService.logout();

    // Redirect based on role
    switch (role) {
      case 'admin':
        this.router.navigate(['/login']); // apps/admin
        break;
      case 'manager':
        this.router.navigate(['/login']); // apps/manager
        break;
      case 'staff':
        this.router.navigate(['/login']); // apps/staff
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
