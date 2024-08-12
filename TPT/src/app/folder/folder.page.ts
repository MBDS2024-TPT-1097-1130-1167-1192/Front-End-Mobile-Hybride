import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { StorageService } from '../services/basic/storage/storage.service';
import { LocalStorageConst } from '../constants/local-storage.const';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
  ],
})
export class FolderPage implements OnInit {
  public folder!: string;
  data: string = 'No';
  private activatedRoute = inject(ActivatedRoute);
  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getData();
  }

  async getData() {
    this.data = await this.storageService.get(
      LocalStorageConst.USER_ACCESS_TOKEN
    );
  }
}
