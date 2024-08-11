import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private dataSubject = new BehaviorSubject<any>({
    statut: false,
    message: '',
  });
  data$ = this.dataSubject.asObservable();

  updateData(newValue: any) {
    if (!this.dataSubject.getValue().statut) {
      this.dataSubject.next(newValue);
      setTimeout(() => {
        this.dataSubject.next({ statut: false, message: '' });
      }, 5000);
    }
  }
}