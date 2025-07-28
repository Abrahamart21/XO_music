import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  async cerrarSesion() {
    await this.storageService.remove("login");
    this.navCtrl.navigateRoot("/login");
  }

  verIntro() {
    this.navCtrl.navigateForward('/intro');
  }
}

