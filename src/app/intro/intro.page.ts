import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  slides = [
    {
      title: 'Bienvenido',
      description: 'Explora géneros musicales únicos',
      image: 'https://cdn-icons-png.flaticon.com/512/4072/4072730.png'
    },
    {
      title: 'Personaliza tu tema',
      description: 'Elige entre claro y oscuro',
      image: 'https://cdn-icons-png.flaticon.com/512/1828/1828490.png'
    },
    {
      title: 'Guarda tu progreso',
      description: 'Todo se recuerda incluso si cierras la app',
      image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png'
    },
    {
      title: '¡Comienza ya!',
      description: 'Presiona el botón para ir al home',
      image: 'https://cdn-icons-png.flaticon.com/512/709/709496.png'
    }
  ];

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {}

  goBack() {
    // ✅ Usar el mismo nombre exacto que en login.page.ts
    this.storageService.set('introVisto', true);
    this.router.navigateByUrl('menu/home');//ruta cambiada por anidacion
  }
}


