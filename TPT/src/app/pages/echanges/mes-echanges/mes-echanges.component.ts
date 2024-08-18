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
} from '@ionic/angular/standalone';
import { EchangesService } from 'src/app/services/echanges.service';
import { ActionSheetController } from '@ionic/angular';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { ModalController } from '@ionic/angular';

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
  ],
})
export class MesEchangesComponent implements OnInit {
  public exchanges: any[] = [];

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
            console.log("Effectuer l'échange clicked");
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
    if (exchange.proposer) {
      const modal = await this.modalController.create({
        component: QrCodeModalComponent,
        componentProps: {
          qrCodeUrl:
            'https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png',
        },
      });
      modal.onDidDismiss().then(() => {
        this.loadEchangesEnCours();
      });
      await modal.present();
    } else {
      console.log('Exchange action for accepter:', exchange);
    }
  }
}
