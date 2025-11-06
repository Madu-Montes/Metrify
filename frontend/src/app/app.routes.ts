import { Routes } from '@angular/router';
import { RegisterUserComponent } from './auth/register-user/register-user';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then(m => m.Register),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./auth/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'register-user',
    component: RegisterUserComponent
  },
  { path: '**', redirectTo: 'login' } 
];
