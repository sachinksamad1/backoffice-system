import { Component } from '@angular/core';
import { LoginForm } from './login-form/login-form';

@Component({
  selector: 'lib-shared-ui',
  imports: [LoginForm],
  templateUrl: './shared-ui.html',
  styleUrl: './shared-ui.css',
})
export class SharedUi {}
