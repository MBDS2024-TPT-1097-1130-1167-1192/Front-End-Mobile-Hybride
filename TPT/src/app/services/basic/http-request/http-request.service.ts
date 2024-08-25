import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { LocalStorageConst } from 'src/app/constants/local-storage.const';
import { Network } from '@capacitor/network';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { AuthService } from '../../auth.service';
import { DataRoutingConst } from 'src/app/constants/data-routing.const';
import { Router } from '@angular/router';
import { EnvironmentConst } from 'src/app/constants/data-env.const';
import { DataWsConst } from 'src/app/constants/data-ws.const';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private authorizationToken: string = '-';
  private loginUrl = EnvironmentConst.API_URL + DataWsConst.WS_LOGIN;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.setAuthorizationTokenValue(null);
  }

  protected async setAuthorizationTokenValue(
    authorization: any
  ): Promise<void> {
    if (authorization == 'USER') {
      const token = await this.storageService.get(
        LocalStorageConst.USER_ACCESS_TOKEN
      );
      this.authorizationToken = 'Bearer ' + token;
    }
  }

  private isTokenValid(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate([DataRoutingConst.ROUTE_LOGIN], {
            replaceUrl: true,
          });
          this.snackBarService.openErrorSnackBar(
            'Votre session a expiré. Veuillez vous reconnecter.'
          );
          return false;
        }
        return true;
      })
    );
  }

  protected getOptions(authorization: any, options: any = {}): Observable<any> {
    return this.isTokenValid().pipe(
      switchMap((isValid) => {
        if (!isValid) {
          return of(null);
        }
        return from(this.setAuthorizationTokenValue(authorization)).pipe(
          map(() => this.configureHeaders(options))
        );
      })
    );
  }

  private configureHeaders(options: any): any {
    let requestHeaders: HttpHeaders;
    const allowHeaders = '*';
    const contentType = 'application/json';

    if (options.headers && options.headers instanceof HttpHeaders) {
      requestHeaders = options.headers as HttpHeaders;
      requestHeaders = requestHeaders
        .append('Access-Control-Allow-Headers', allowHeaders)
        .append('Content-Type', contentType)
        .append('Accept', contentType)
        .append('Authorization', this.authorizationToken);
    } else {
      requestHeaders = new HttpHeaders({
        'Access-Control-Allow-Headers': allowHeaders,
        'Content-Type': contentType,
        Accept: contentType,
        Authorization: this.authorizationToken,
      });
    }

    if (!options.observe) {
      options.observe = 'body';
    }
    options.headers = requestHeaders;
    return options;
  }

  public post<T>(
    authorization: any,
    url: string,
    body: any,
    options: any = {}
  ): Observable<any> {
    if (url === this.loginUrl) {
      return this.http.post<T>(url, body, options);
    } else {
      return from(Network.getStatus()).pipe(
        switchMap((status) => {
          if (!status.connected) {
            this.snackBarService.openErrorSnackBar(
              'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
            );
            return of(null);
          } else {
            return this.getOptions(authorization, options).pipe(
              switchMap((finalOptions) => {
                if (!finalOptions) {
                  return of(null);
                }
                return this.http.post<T>(url, body, finalOptions);
              })
            );
          }
        })
      );
    }
  }

  public get<T>(
    authorization: any,
    url: string,
    options: any = {}
  ): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.getOptions(authorization, options).pipe(
            switchMap((finalOptions) => {
              if (!finalOptions) {
                return of(null);
              }
              return this.http.get<T>(url, finalOptions);
            })
          );
        }
      })
    );
  }

  public put<T>(
    authorization: any,
    url: string,
    body: any,
    options: any = {}
  ): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.getOptions(authorization, options).pipe(
            switchMap((finalOptions) => {
              if (!finalOptions) {
                return of(null);
              }
              return this.http.put<T>(url, body, finalOptions);
            })
          );
        }
      })
    );
  }

  public delete<T>(
    authorization: any,
    url: string,
    options: any = {}
  ): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.getOptions(authorization, options).pipe(
            switchMap((finalOptions) => {
              if (!finalOptions) {
                return of(null);
              }
              return this.http.delete<T>(url, finalOptions);
            })
          );
        }
      })
    );
  }

  public patch<T>(
    authorization: any,
    url: string,
    body: any,
    options: any = {}
  ): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.getOptions(authorization, options).pipe(
            switchMap((finalOptions) => {
              if (!finalOptions) {
                return of(null);
              }
              return this.http.patch<T>(url, body, finalOptions);
            })
          );
        }
      })
    );
  }

  public head<T>(
    authorization: any,
    url: string,
    options: any = {}
  ): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.getOptions(authorization, options).pipe(
            switchMap((finalOptions) => {
              if (!finalOptions) {
                return of(null);
              }
              return this.http.head<T>(url, finalOptions);
            })
          );
        }
      })
    );
  }

  public options<T>(
    authorization: any,
    url: string,
    options: any = {}
  ): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.getOptions(authorization, options).pipe(
            switchMap((finalOptions) => {
              if (!finalOptions) {
                return of(null);
              }
              return this.http.options<T>(url, finalOptions);
            })
          );
        }
      })
    );
  }
}
