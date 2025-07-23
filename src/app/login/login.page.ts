import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = "";
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Formato de email inválido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Debe tener mínimo 5 caracteres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit() {}

  async loginUser(credentials: any) {
    try {
      await this.authService.loginUser(credentials);
      this.errorMessage = "";

      await this.storageService.set('logueado', true);
      await this.storageService.set('introVisto', false);

      this.navCtrl.navigateForward('/intro');
    } catch (error: any) {
      this.errorMessage = error;
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
