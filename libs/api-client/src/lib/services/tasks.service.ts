import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/manager/tasks';

  getAll() {
    return lastValueFrom(this.http.get<any[]>(this.baseUrl));
  }

  create(task: any) {
    return lastValueFrom(this.http.post(this.baseUrl, task));
  }

  delete(id: string) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }
}
