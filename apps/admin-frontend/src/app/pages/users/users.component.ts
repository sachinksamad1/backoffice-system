import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [CommonModule],
})
export class UsersComponent {
  users = [
    { name: 'Alice', role: 'Manager' },
    { name: 'Bob', role: 'Staff' },
  ];
}
