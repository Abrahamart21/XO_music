import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) {}

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (credentials.email == "abraham123@gmail.com" && credentials.password == "1234567") {
        this.storage.set('isLoggedIn', true);
        accept("login correcto");
      } else {
        reject("login incorrecto");
      }
    });
  }

  registrarUsuario(data: any) {
    return new Promise(async (accept, reject) => {
      try {
        await this.storage.set('registro', data);
        accept("registro exitoso");
      } catch (error) {
        reject("error al registrar");
      }
    });
  }
}
//este es el primero