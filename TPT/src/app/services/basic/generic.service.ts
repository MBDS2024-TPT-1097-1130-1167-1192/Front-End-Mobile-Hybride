import {Injectable} from '@angular/core';
import {ErrorService} from "./error.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {LOCALSTORAGE_TOKEN_LABEL} from "../../constants/configuration";
import {LocalStorageConst} from "../../constants/local-storage.const";


export interface ApiResponse <T> {
  status: number;
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  error: any = {};
  private baseUrl: string = "http://localhost:8080";
  // private baseUrl: string = "https://mini-projet-assignment-backend.onrender.com/api";
  constructor(private ErrorService: ErrorService, private http: HttpClient) {
    this.ErrorService.data$.subscribe((value) => (this.error = value));
  }


  private getToken() {
    return localStorage.getItem(LocalStorageConst.USER_ACCESS_TOKEN) || "";
  }

  private getHeader(authenticate = true) {
    const token = this.getToken();
    let header: HttpHeaders = new HttpHeaders();
    if (authenticate) {
      header = header.set("Authorization", `Bearer ${token}`);
    }
    return header;
  }

  get<T>(path: string, authenticate=true): Observable<T> {
    let header = this.getHeader(authenticate);
    return this.http.get<T>(`${this.baseUrl}/${path}`, {headers: header}).pipe(
      catchError((error: HttpErrorResponse) => {
        this.error = {
          statut: true,
          message: error.message,
        };
        this.ErrorService.updateData(this.error);
        // Renvoie une erreur observable
        return throwError(() => error);
      }));
  }

  post<T>(path: string, data: any, authenticate = true): Observable<T> {
    let header = this.getHeader(authenticate);
    return this.http.post<T>(`${this.baseUrl}/${path}`, data, {headers: header}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("POST caught error ", error.message);
        // Gérez l'erreur ici
        this.error = {
          statut: true,
          message: error.message,
        };
        this.ErrorService.updateData(this.error);
        // Renvoie une erreur observable
        return throwError(() => error);
      }));
  }
  delete<T>(path: string, id: any, authenticate = true): Observable<T> {
    let header = this.getHeader(authenticate);
    return this.http.delete<T>(`${this.baseUrl}/${path}/${id}`, {headers: header}).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gérez l'erreur ici
        this.error = {
          statut: true,
          message: error.message,
        };
        this.ErrorService.updateData(this.error);
        // Renvoie une erreur observable
        return throwError(() => error);
      }));
  }
  put<T>(path: string, data: any, authenticate = true): Observable<T> {
    let header = this.getHeader(authenticate);
    return this.http.put<T>(`${this.baseUrl}/${path}`, data, {headers: header}).pipe(

      catchError((error: HttpErrorResponse) => {
        // Gérez l'erreur ici
        this.error = {
          statut: true,
          message: error.message,
        };
        this.ErrorService.updateData(this.error);
        // Renvoie une erreur observable
        return throwError(() => error);
      }));
  }
}
