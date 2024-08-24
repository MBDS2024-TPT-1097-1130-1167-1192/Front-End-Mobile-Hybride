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
    private modalController: ModalController
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
        console.error(
          'Erreur lors de la récupération des échanges en cours',
          error
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
        /*{
          text: 'Voir les détails',
          handler: () => {
            console.log('Voir les détails clicked');
            this.viewDetails(exchange);
          },
        },*/
        {
          text: "Effectuer l'échange",
          handler: () => {
            this.exchange(exchange);
          },
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  /*viewDetails(exchange: any) {
    // Logique pour voir les détails de l'échange
    console.log('Viewing details for exchange:', exchange);
  }*/

  async exchange(exchange: any) {
    if (exchange.proposer == 'true') {
      this.scanBarcode();
    } else {
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
    }
  }

  public async scanBarcode(): Promise<void> {
    this.barcodeResult = (
      await CapacitorBarcodeScanner.scanBarcode(this.barcodeOptions)
    ).ScanResult;
    console.log('Barcode data:', this.barcodeResult);
  }
}
