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
    private actionSheetController: ActionSheetController
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
        {
          text: 'Voir les détails',
          handler: () => {
            console.log('Voir les détails clicked');
            this.viewDetails(exchange);
          },
        },
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

  viewDetails(exchange: any) {
    // Logique pour voir les détails de l'échange
    console.log('Viewing details for exchange:', exchange);
  }

  exchange(exchange: any) {
    // Logique pour refuser l'échange
    console.log('Exchanging:', exchange);
  }
}
