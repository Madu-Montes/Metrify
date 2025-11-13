import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegisterUser } from './auth/register-user/register-user';
import { Dashboard } from './auth/dashboard/dashboard';
import { Register } from './auth/register/register';
import { CodigoAcesso } from './auth/code-access/code-access';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register-user', component: RegisterUser },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'code-access', component: CodigoAcesso },
  { path: '**', redirectTo: '/login' }
];
