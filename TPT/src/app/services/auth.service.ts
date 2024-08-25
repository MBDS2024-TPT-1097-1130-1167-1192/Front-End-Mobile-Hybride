import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './basic/storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageConst } from '../constants/local-storage.const';
import { HttpRequestService } from './basic/http-request/http-request.service';
import { EnvironmentConst } from '../constants/data-env.const';
import { DataWsConst } from '../constants/data-ws.const';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private jwtHelper: JwtHelperService
  ) {}

  getToken(): Observable<string | null> {
    return from(this.storageService.get(LocalStorageConst.USER_ACCESS_TOKEN));
  }

  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(
      map((token) => {
        if (!token) {
          return false;
        }
        const isExpired = this.jwtHelper.isTokenExpired(token);
        return !isExpired;
      })
    );
  }

  logout(): void {
    this.storageService.remove(LocalStorageConst.USER_ACCESS_TOKEN);
  }
}
