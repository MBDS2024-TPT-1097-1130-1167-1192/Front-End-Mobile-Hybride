import { Injectable } from '@angular/core';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  openErrorSnackBar(errorMessage: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: 'Erreur : ' + errorMessage,
      },
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'error',
    });
  }

  openSuccesSnackBar(successMessage: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: 'Succes : ' + successMessage,
      },
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'success',
    });
  }
}
