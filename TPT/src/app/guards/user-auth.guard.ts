import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataRoutingConst } from '../constants/data-routing.const';

export const UserAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate([DataRoutingConst.ROUTE_LOGIN]);
        return false;
      }
      return true;
    })
  );
};
