import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/admin/users';

  getAll() {
    return lastValueFrom(this.http.get<any[]>(this.baseUrl));
  }

  create(user: any) {
    return lastValueFrom(this.http.post(this.baseUrl, user));
  }

  update(id: string, user: any) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/${id}`, user));
  }

  delete(id: string) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }
}
