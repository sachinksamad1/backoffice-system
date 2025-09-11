import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '@backoffice-system/api-client';

@Component({
    selector: 'lib-login-form',
    imports: [CommonModule, FormsModule],
    templateUrl: './login-form.html',
})
export class LoginForm {
    email = '';
    password = '';

    // constructor(private authService: AuthService, private router: Router) {}

    // login() {
    //     this.authService.login(this.email, this.password).subscribe(() => {
    //         this.router.navigate(['/']);
    //     });
    // }
    login() {
        console.log('Login attempted with', this.email, this.password);
    }
}