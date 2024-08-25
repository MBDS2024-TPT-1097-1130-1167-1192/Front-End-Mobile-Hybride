import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { EchangesService } from 'src/app/services/echanges.service';
import { ActionSheetController } from '@ionic/angular';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { ModalController } from '@ionic/angular';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerOptions,
  CapacitorBarcodeScannerTypeHintALLOption,
} from '@capacitor/barcode-scanner';
import { HttpRequestService } from 'src/app/services/basic/http-request/http-request.service';
import { EnvironmentConst } from 'src/app/constants/data-env.const';
import { DataWsConst } from 'src/app/constants/data-ws.const';
import { SnackBarService } from 'src/app/services/basic/snack-bar/snack-bar.service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-mes-echanges',
  templateUrl: './mes-echanges.component.html',
  styleUrls: ['./mes-echanges.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class MesEchangesComponent implements OnInit {
  public exchanges: any[] = [];
  public barcodeResult!: string;
  private barcodeOptions: CapacitorBarcodeScannerOptions = {
    scanButton: true,
    hint: CapacitorBarcodeScannerTypeHintALLOption.ALL,
  };

  constructor(
    private echangesService: EchangesService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private httpRequestService: HttpRequestService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.loadEchangesEnCours();
  }

  loadEchangesEnCours() {
    this.echangesService.getEchangesEnCours().subscribe(
      (data) => {
        this.exchanges = data.data;
      },
      (error) => {
        this.snackBarService.openErrorSnackBar(
          'Erreur lors de la récupération des échanges en cours : ' +
            error.message
        );
      }
    );
  }

  refresh(event: any) {
    setTimeout(() => {
      this.loadEchangesEnCours();
      event.target.complete();
    }, 1000);
  }

  async showActionSheet(exchange: any) {
    const actionSheet = await this.actionSheetController.create({
      header: "Gérer l'échange",
      buttons: [
        {
          text: "Effectuer l'échange",
          handler: () => {
            this.exchange(exchange);
          },
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  async exchange(exchange: any) {
    if (!exchange.proposer) {
      console.log('qrCodeUrl : ', exchange.qrCodeUrl);
      const modal = await this.modalController.create({
        component: QrCodeModalComponent,
        componentProps: {
          qrCodeUrl: exchange.qrCodeUrl,
        },
      });
      modal.onDidDismiss().then(() => {
        this.loadEchangesEnCours();
      });
      await modal.present();
    } else {
      await this.scanBarcode(exchange);
    }
  }

  public async scanBarcode(exchange: any): Promise<void> {
    try {
      this.barcodeResult = (
        await CapacitorBarcodeScanner.scanBarcode(this.barcodeOptions)
      ).ScanResult;

      if (this.barcodeResult === exchange.qrCodeData) {
        const url =
          `${EnvironmentConst.API_URL}${DataWsConst.WS_POST_QR_CODE_SCAN_ECHANGE}` +
          `?qrCodeData=${this.barcodeResult}&scannerId=${exchange.exchange.proposer.id}&scannedUserId=${exchange.exchange.accepter.id}`;

        await lastValueFrom(this.httpRequestService.post('USER', url, {}))
          .then((response) => {
            this.snackBarService.openSuccesSnackBar(
              'Échange effectué avec succès.'
            );
            this.loadEchangesEnCours();
          })
          .catch((error) => {
            this.snackBarService.openErrorSnackBar(
              'Erreur lors de la validation du QR code : ' + error.message
            );
          });
      } else {
        this.snackBarService.openErrorSnackBar(
          'Erreur lors de la validation du QR code.'
        );
      }
    } catch (error) {
      this.snackBarService.openErrorSnackBar(
        'Erreur lors du scan du QR code : ' + error
      );
    }
  }
}
