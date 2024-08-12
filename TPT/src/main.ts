import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { StorageService } from './app/services/basic/storage/storage.service';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(
      IonicModule.forRoot(),
      IonicStorageModule.forRoot({
        driverOrder: [
          Drivers.SecureStorage,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      })
    ),
    StorageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
});
