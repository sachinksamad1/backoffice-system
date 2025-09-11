import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/staff/attendance';

  checkIn() {
    return lastValueFrom(this.http.post(`${this.baseUrl}/check-in`, {}));
  }

  checkOut() {
    return lastValueFrom(this.http.post(`${this.baseUrl}/check-out`, {}));
  }

  getHistory() {
    return lastValueFrom(this.http.get<unknown[]>(`${this.baseUrl}/history`));
  }
}
