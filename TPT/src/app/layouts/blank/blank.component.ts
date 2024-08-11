import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonRouterLink, IonRouterOutlet],
})
export class BlankComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
