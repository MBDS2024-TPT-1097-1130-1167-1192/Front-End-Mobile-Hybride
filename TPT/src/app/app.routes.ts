import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { UserAuthGuard } from './guards/user-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'folder/inbox',
        pathMatch: 'full',
      },
      {
        path: 'folder/:id',
        canActivate: [UserAuthGuard],
        loadComponent: () =>
          import('./folder/folder.page').then((m) => m.FolderPage),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];
