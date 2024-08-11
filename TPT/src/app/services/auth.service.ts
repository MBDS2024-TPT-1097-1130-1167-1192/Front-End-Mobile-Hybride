import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './basic/http-request/http-request.service';
import { EnvironmentConst } from 'src/app/constants/data-env.const';
import { DataWsConst } from 'src/app/constants/data-ws.const';
import { LocalStorageService } from './basic/local-storage/local-storage.service';
import { LocalStorageConst } from 'src/app/constants/local-storage.const';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpRequestService: HttpRequestService,
    private localStorageService: LocalStorageService
  ) {}

  public login(user: any): Observable<any> {
    return this.httpRequestService.post(
      null,
      EnvironmentConst.API_URL + DataWsConst.WS_LOGIN,
      user
    );
  }

  checkAuthorisation() {
    const helper = new JwtHelperService();
    const token =
      this.localStorageService.getItem(LocalStorageConst.USER_ACCESS_TOKEN) !=
      null
        ? this.localStorageService.getItem(LocalStorageConst.USER_ACCESS_TOKEN)
        : '';
    return !helper.isTokenExpired(token);
  }
}
