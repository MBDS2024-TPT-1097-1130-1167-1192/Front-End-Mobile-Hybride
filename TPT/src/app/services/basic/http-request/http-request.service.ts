import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { LocalStorageService } from 'src/app/services/basic/local-storage/local-storage.service';
import { LocalStorageConst } from 'src/app/constants/local-storage.const';
import { Network } from '@capacitor/network';
import { switchMap } from 'rxjs/operators';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private authorizationToken: string = '-';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackBarService
  ) {
    this.setAuthorizationTokenValue(null);
  }

  protected setAuthorizationTokenValue(authorization: any): void {
    if (authorization == 'USER') {
      this.authorizationToken =
        'Bearer ' +
        this.localStorageService.getItem(LocalStorageConst.USER_ACCESS_TOKEN);
    }
  }

  protected getOptions(authorization: any, options: any = {}): any {
    this.setAuthorizationTokenValue(authorization);
    let requestHeaders: HttpHeaders;
    var allowHeaders = '*';
    var contentType = 'application/json';
    if (options.headers && options.headers instanceof HttpHeaders) {
      requestHeaders = options.headers as HttpHeaders;
      requestHeaders.append('Access-Control-Allow-Headers', allowHeaders);
      requestHeaders.append('Content-Type', contentType);
      requestHeaders.append('Accept', contentType);
      requestHeaders.append('Authorization', this.authorizationToken);
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
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return of(null);
        } else {
          return this.http.post<T>(
            url,
            body,
            this.getOptions(authorization, options)
          );
        }
      })
    );
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
          return this.http.get<T>(url, this.getOptions(authorization, options));
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
          return this.http.put<T>(
            url,
            body,
            this.getOptions(authorization, options)
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
          return this.http.delete<T>(
            url,
            this.getOptions(authorization, options)
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
          return this.http.patch<T>(
            url,
            body,
            this.getOptions(authorization, options)
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
          return this.http.head<T>(
            url,
            this.getOptions(authorization, options)
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
          return this.http.options<T>(
            url,
            this.getOptions(authorization, options)
          );
        }
      })
    );
  }
}
