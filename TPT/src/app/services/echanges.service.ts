import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpRequestService } from './basic/http-request/http-request.service';
import { EnvironmentConst } from '../constants/data-env.const';
import { DataWsConst } from '../constants/data-ws.const';
import { StorageService } from './basic/storage/storage.service';
import { Network } from '@capacitor/network';
import { SnackBarService } from './basic/snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class EchangesService {
  private readonly STORAGE_KEY = 'local_exchanges';

  constructor(
    private httpRequestService: HttpRequestService,
    private storageService: StorageService,
    private snackBarService: SnackBarService
  ) {}

  getEchangesEnCours(): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (!status.connected) {
          this.snackBarService.openErrorSnackBar(
            'Aucune connexion Internet. Veuillez vérifier votre connexion et réessayer.'
          );
          return from(this.storageService.get(this.STORAGE_KEY));
        } else {
          const url = `${
            EnvironmentConst.API_URL + DataWsConst.WS_GET_MES_ECHANGES
          }/my?status=accepted`;
          return this.httpRequestService.get('USER', url).pipe(
            switchMap((data) => {
              return from(this.storageService.set(this.STORAGE_KEY, data)).pipe(
                switchMap(() => of(data))
              );
            })
          );
        }
      })
    );
  }
}
