import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID
  private isBrowser: boolean;
  private baseUrl = 'http://localhost:3000/auth';

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in a browser
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const res: any = await lastValueFrom(
        this.http.post(`${this.baseUrl}/login`, { email, password })
      );
      if (this.isBrowser) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      return true;
    } catch {
      return false;
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  getAccessToken() {
    if (this.isBrowser) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  getRefreshToken() {
    if (this.isBrowser) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res: any = await lastValueFrom(
        this.http.post(`${this.baseUrl}/refresh`, { refreshToken })
      );
      if (this.isBrowser) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      return res.accessToken;
    } catch {
      this.logout();
      return null;
    }
  }
}