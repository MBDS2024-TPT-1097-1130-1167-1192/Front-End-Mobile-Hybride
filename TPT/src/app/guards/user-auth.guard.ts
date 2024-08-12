import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataRoutingConst } from '../constants/data-routing.const';
import { SnackBarService } from '../services/basic/snack-bar/snack-bar.service';

export const UserAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBarService = inject(SnackBarService);

  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate([DataRoutingConst.ROUTE_LOGIN]);
        snackBarService.openErrorSnackBar(
          'Vous devez vous connecter pour accéder à ce contenu.'
        );
        return false;
      }
      return true;
    })
  );
};
