import { Route } from '@angular/router';

import { authGuard, roleGuard } from '@backoffice-system/api-client';
import { LoginComponent, UnauthorizedComponent } from '@backoffice-system/ui-auth';

export const appRoutes: Route[] = [
          {
    path: 'dashboard',
    canActivate: [authGuard, roleGuard('admin')],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'dashboard' },
];
