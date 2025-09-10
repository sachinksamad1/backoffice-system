import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./pages/login/login.components";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UsersComponent } from "./pages/users/users.component";

@Component({
  imports: [RouterModule, LoginComponent, DashboardComponent, UsersComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'admin-frontend';
}
