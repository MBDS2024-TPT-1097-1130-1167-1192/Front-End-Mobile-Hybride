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

  constructor(private echangesService: EchangesService) {}

  ngOnInit() {
    this.loadEchangesEnCours();
  }

  loadEchangesEnCours() {
    this.echangesService.getEchangesEnCours().subscribe(
      (data) => {
        this.exchanges = data.data;
        console.log('------------------');
        console.log(this.exchanges);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des échanges en cours',
          error
        );
      }
    );
  }

  performAction(exchange: any) {
    // Action à effectuer lors du clic sur le bouton
    console.log('Action performed on exchange:', exchange);
  }
}
