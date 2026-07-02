import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',

    loadComponent: () => import('./features/auth/pages/login/login').then((c) => c.Login),
  },

  {
    path: '',

    loadComponent: () => import('./layouts/main-layout/main-layout').then((c) => c.MainLayout),

    children: [
      {
        path: 'dashboard',
        data: {
          title: 'Dashboard',
        },
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((c) => c.Dashboard),
      },

      {
        path: 'patients',
        data: {
          title: 'Patients',
        },
        loadComponent: () =>
          import('./features/patients/pages/patients-list/patients-list').then(
            (c) => c.PatientsList,
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
