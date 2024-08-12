import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eyeOff, eye } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/basic/local-storage/local-storage.service';
import { LocalStorageConst } from 'src/app/constants/local-storage.const';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/basic/storage/storage.service';
import { SnackBarService } from 'src/app/services/basic/snack-bar/snack-bar.service';
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
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private storageService: StorageService,
    private router: Router,
    private snackBarService: SnackBarService
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
      };

      this.authService.login(userData).subscribe({
        next: async (res) => {
          await this.storageService.set(
            LocalStorageConst.USER_ACCESS_TOKEN,
            res.data.user_access_token
          );
          this.router.navigate(['/folder/inbox']);
          this.snackBarService.openSuccesSnackBar(
            'Vous êtes maintenant connecté.'
          );
        },
        error: () => {
          this.snackBarService.openErrorSnackBar(
            'Votre email ou votre mot de passe est incorrect.'
          );
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
