import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eyeOff, eye } from 'ionicons/icons';
import { LocalStorageConst } from 'src/app/constants/local-storage.const';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/basic/storage/storage.service';
import { SnackBarService } from 'src/app/services/basic/snack-bar/snack-bar.service';
import { DataRoutingConst } from 'src/app/constants/data-routing.const';
import { HttpRequestService } from 'src/app/services/basic/http-request/http-request.service';
import { EnvironmentConst } from 'src/app/constants/data-env.const';
import { DataWsConst } from 'src/app/constants/data-ws.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  public darkMode = false;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private snackBarService: SnackBarService,
    private httpRequestService: HttpRequestService
  ) {
    addIcons({
      eye,
      eyeOff,
    });
  }

  ngOnInit() {
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark', this.darkMode);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    document.body.classList.toggle('dark', this.darkMode);
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  login() {
    if (this.loginForm.valid) {
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        role: 'User',
      };

      this.httpRequestService
        .post(null, EnvironmentConst.API_URL + DataWsConst.WS_LOGIN, userData)
        .subscribe({
          next: (res) => {
            this.storageService
              .set(
                LocalStorageConst.USER_ACCESS_TOKEN,
                res.data.user_access_token
              )
              .then(() => {
                this.router.navigate([DataRoutingConst.ROUTE_MES_ECHANGES], {
                  replaceUrl: true,
                });
                this.snackBarService.openSuccesSnackBar(
                  'Vous êtes maintenant connecté.'
                );
              });
          },
          error: (err) => {
            if (err.status == 401) {
              this.snackBarService.openErrorSnackBar(
                'Email ou mot de passe incorrect. Veuillez réessayer.'
              );
            } else {
              this.snackBarService.openErrorSnackBar(
                err.url + ' ' + err.error.message + ' ' + err.status
              );
            }
          },
          complete: () => {},
        });
    } else {
      this.displayFormErrors();
    }
  }

  getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      email: 'email',
      password: 'mot de passe',
    };
    return labels[field] || field;
  }

  displayFormErrors() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const controlErrors = this.loginForm.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((errorKey) => {
          const fieldLabel = this.getFieldLabel(key);
          switch (errorKey) {
            case 'required':
              this.snackBarService.openErrorSnackBar(
                `Le champ ${fieldLabel} est requis.`
              );
              break;
            case 'email':
              this.snackBarService.openErrorSnackBar(
                `Le champ ${fieldLabel} doit être un email valide.`
              );
              break;
            default:
              this.snackBarService.openErrorSnackBar(
                `Erreur inconnue dans le champ ${fieldLabel}:` + controlErrors
              );
          }
        });
      }
    });
  }
}
