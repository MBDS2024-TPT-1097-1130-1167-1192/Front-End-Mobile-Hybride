import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './basic/http-request/http-request.service';
import { EnvironmentConst } from '../constants/data-env.const';
import { DataWsConst } from '../constants/data-ws.const';

@Injectable({
  providedIn: 'root',
})
export class EchangesService {
  constructor(private httpRequestService: HttpRequestService) {}

  getEchangesEnCours(): Observable<any> {
    const url = `${
      EnvironmentConst.API_URL + DataWsConst.WS_GET_MES_ECHANGES
    }/my?status=accepted`;
    return this.httpRequestService.get('USER', url);
  }
}
