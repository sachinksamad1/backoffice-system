import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauthorized">
      <h2>🚫 Unauthorized</h2>
      <p>You do not have access to this page.</p>
      <a routerLink="/login">Go to Login</a>
    </div>
  `,
  styles: [`
    .unauthorized { text-align: center; margin-top: 100px; }
    a { color: #007bff; text-decoration: underline; }
  `]
})
export class UnauthorizedComponent {}
