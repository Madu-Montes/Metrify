import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(c => c.Login)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard')
        .then(c => c.Dashboard)
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./features/patients/pages/patients-list/patients-list')
        .then(c => c.PatientsList)
  }
];
