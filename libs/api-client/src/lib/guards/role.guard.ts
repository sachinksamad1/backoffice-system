import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  [key: string]: any;
}

export function roleGuard(expectedRole: string): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getAccessToken();
    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.role === expectedRole) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    } catch {
      authService.logout();
      router.navigate(['/login']);
      return false;
    }
  };
}
