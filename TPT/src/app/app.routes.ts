import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'mes-echanges',
        pathMatch: 'full',
      },
      {
        path: 'mes-echanges',
        loadComponent: () =>
          import('./pages/echanges/mes-echanges/mes-echanges.component').then(
            (m) => m.MesEchangesComponent
          ),
      },
    ],
  },
  {
    path: 'authentication',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
