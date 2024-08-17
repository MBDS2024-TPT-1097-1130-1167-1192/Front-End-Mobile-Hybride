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

  constructor() {}

  ngOnInit() {
    // Charger les échanges en cours (données mock pour l'exemple)
    this.exchanges = [
      {
        myItems: [
          {
            name: 'Objetkndslngsfdlkjfskdfkdsjfkj',
            imageUrl: 'assets/images/products/s4.jpg',
          },
          {
            name: 'Objet 2dsfsdfdsf',
            imageUrl: 'assets/images/products/s5.jpg',
          },
          { name: 'Objet 2', imageUrl: 'assets/images/products/s5.jpg' },
          { name: 'Objet 2', imageUrl: 'assets/images/products/s5.jpg' },
          { name: 'Objet 2', imageUrl: 'assets/images/products/s5.jpg' },
          { name: 'Objet 2', imageUrl: 'assets/images/products/s5.jpg' },
          { name: 'Objet 2', imageUrl: 'assets/images/products/s5.jpg' },
          { name: 'Objet 2', imageUrl: 'assets/images/products/s5.jpg' },
        ],
        otherPersonItems: [
          { name: 'Objet A', imageUrl: 'assets/images/products/s7.jpg' },
          { name: 'Objet B', imageUrl: 'assets/images/products/s11.jpg' },
        ],
        otherPerson: {
          name: 'John Doe',
          imageUrl: 'assets/images/profile/user-2.jpg',
        },
        acceptanceDate: new Date().toLocaleDateString(),
      },
      {
        myItems: [
          { name: 'Objet 3', imageUrl: 'assets/images/objets/objet3.png' },
          { name: 'Objet 4', imageUrl: 'assets/images/objets/objet4.png' },
        ],
        otherPersonItems: [
          { name: 'Objet C', imageUrl: 'assets/images/objets/objetC.png' },
          { name: 'Objet D', imageUrl: 'assets/images/objets/objetD.png' },
        ],
        otherPerson: {
          name: 'Jane Smith',
          imageUrl: 'assets/images/users/jane-smith.png',
        },
        acceptanceDate: new Date().toLocaleDateString(),
      },
    ];
  }

  performAction(exchange: any) {
    // Action à effectuer lors du clic sur le bouton
    console.log('Action performed on exchange:', exchange);
  }
}
