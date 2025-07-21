import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) {}

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (
        credentials.email == "abraham213@gamil.com" &&
        credentials.password == "1234567"
      ) {
        this.storage.set('login', true); // ✅ guarda login
        accept("login correcto");
      } else {
        reject("login incorrecto");
      }
    });
  }
}

