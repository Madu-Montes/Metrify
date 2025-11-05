import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./auth/dashboard/dashboard').then(m => m.Dashboard),
  },
];
