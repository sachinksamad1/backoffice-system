import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoutComponent } from '@backoffice-system/ui-auth';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, LogoutComponent],
})
export class DashboardComponent {}
