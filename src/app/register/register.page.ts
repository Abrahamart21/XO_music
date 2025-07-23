import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio.' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio.' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Formato de email inválido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Debe tener mínimo 6 caracteres.' }
    ]
  };

  constructor(private fb: FormBuilder, private navCtrl: NavController, private storageService: StorageService) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {}

  async registerUser() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      try {
        await this.storageService.set('user-data', data);
        this.navCtrl.navigateRoot('/login');
      } catch (error) {
        this.errorMessage = "Error al guardar usuario.";
      }
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
