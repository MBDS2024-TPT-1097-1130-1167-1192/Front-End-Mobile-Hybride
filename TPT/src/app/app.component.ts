import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { StorageService } from './services/basic/storage/storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.storageService.init();
  }
}
