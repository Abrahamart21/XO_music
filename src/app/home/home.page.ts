import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service'; // tu servicio personalizado

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  colorOscuro: boolean = true;

  genres = [
    {
      title: "Musica POP",
      image: "https://webmediums.com/media/max_1200/1*EIL2v8UkmN1qElm5JXAWVQ.jpeg",
      description: "La música pop es un estilo musical derivado de la música popular...",
      colorClaro: "#fce4ec",
      colorOscuro: "#ff0000",
      textoClaro: true
    },
    {
      title: "RAGGAETON",
      image: "https://www.celebtattler.com/wp-content/uploads/2018/07/J-Balvin-2016-press-billboard-650-1548.jpg",
      description: "El reggaetón es un tipo de género musical...",
      colorClaro: "#66e0ff",
      colorOscuro: "#00cc00",
      textoClaro: true
    },
    {
      title: "K-POP",
      image: "https://tse3.mm.bing.net/th/id/OIP.4S1i24IIQiJy5LXAynFUEQHaF7?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "El K-pop es un género musical que se originó en Corea del Sur...",
      colorClaro: "#e1bee7",
      colorOscuro: "#7733ff",
      textoClaro: true
    },
    {
      title: "ROCK",
      image: "https://tse4.mm.bing.net/th/id/OIP.gOSopf5luEqxqjFedR8HUAHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Rock and roll es un género musical nacido en los 50s...",
      colorClaro: "#c8e6c9",
      colorOscuro: "#0066cc",
      textoClaro: true
    }
  ];

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    const savedColor = await this.storageService.get('tema-color');
    this.colorOscuro = savedColor !== 'claro'; 
  }

  async cambiaColor() {
    this.colorOscuro = !this.colorOscuro;
    const tema = this.colorOscuro ? 'oscuro' : 'claro';
    await this.storageService.set('tema-color', tema);
  }

  obtenerColor(genre: any): string {
    return this.colorOscuro ? genre.colorOscuro : genre.colorClaro;
  }

  obtenerTextoColor(): string {
    return this.colorOscuro ? 'white' : 'black';
  }
}
