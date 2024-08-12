import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private toastController: ToastController) {}

  async openErrorSnackBar(errorMessage: String) {
    const toast = await this.toastController.create({
      message: errorMessage.toString(),
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }

  async openSuccesSnackBar(successMessage: String) {
    const toast = await this.toastController.create({
      message: successMessage.toString(),
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();
  }
}
