import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '@backoffice-system/api-client';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';

//   constructor(private auth: AuthService, private router: Router) {}

//   async login() {
//     const success = await this.auth.login(this.email, this.password);
//     if (success) this.router.navigate(['/dashboard']);
//   }
}
