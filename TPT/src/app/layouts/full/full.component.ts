import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonToggle,
  IonHeader,
  IonMenuButton,
  IonButtons,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  swapHorizontalOutline,
  swapHorizontalSharp,
  moonSharp,
  logOutOutline,
  logOutSharp,
} from 'ionicons/icons';
import { DataRoutingConst } from 'src/app/constants/data-routing.const';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/basic/snack-bar/snack-bar.service';
@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonToggle,
    IonHeader,
    IonMenuButton,
    IonButtons,
    IonToolbar,
    IonTitle,
  ],
})
export class FullComponent implements OnInit, AfterViewInit {
  public appPages = [
    {
      title: 'Mes échanges en cours',
      url: DataRoutingConst.ROUTE_MES_ECHANGES,
      icon: 'swap-horizontal',
    },
  ];
  @ViewChild(IonHeader, { read: ElementRef }) header: ElementRef | undefined;
  public headerHeight = 0;
  public darkMode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    addIcons({
      swapHorizontalOutline,
      swapHorizontalSharp,
      moonSharp,
      logOutOutline,
      logOutSharp,
    });
  }

  ngOnInit() {
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark', this.darkMode);
  }

  ngAfterViewInit() {
    if (this.header) {
      this.headerHeight = this.header.nativeElement.offsetHeight;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([DataRoutingConst.ROUTE_LOGIN], {
      replaceUrl: true,
    });
    this.snackBarService.openSuccesSnackBar('Vous êtes maintenant déconnecté.');
  }
}
