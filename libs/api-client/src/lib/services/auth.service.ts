import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const res: { token?: string; refreshToken?: string; user?: any } = await lastValueFrom(
        this.http.post(`${this.baseUrl}/login`, { email, password })
      );
      console.log('Login response:', res);
      if (!res.token || typeof res.token !== 'string') {
        console.error('Invalid token:', res.token);
        return false;
      }
      // Note: The backend doesn't return refreshToken, so handle it conditionally
      if (this.isBrowser) {
        console.log('Storing accessToken:', res.token);
        localStorage.setItem('accessToken', res.token);
        if (res.refreshToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          console.warn('No refreshToken in response');
          localStorage.removeItem('refreshToken'); // Clear stale refreshToken if any
        }
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  getAccessToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res: { token?: string } = await lastValueFrom(
        this.http.post(`${this.baseUrl}/refresh`, { refreshToken })
      );
      if (this.isBrowser) {
        if (res.token) {
          localStorage.setItem('accessToken', res.token);
          return res.token;
        }
        console.error('Invalid refresh response:', res);
        return null;
      }
      return null;
    } catch (error) {
      console.error('Refresh error:', error);
      this.logout();
      return null;
    }
  }
}