import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  colorOscuro: boolean = true;
  genres =[
    {
      title: "Musica POP" ,
      image: "https://webmediums.com/media/max_1200/1*EIL2v8UkmN1qElm5JXAWVQ.jpeg" ,
      description: "La música pop es un estilo musical derivado de la música popular. ... Algunas de las características fundamentales de la música pop son la breve duración de sus canciones, la estructura estrofa-estribillo-estrofa de sus composiciones líricas, y sus ritmos y estribillos pegadizos.",
      colorClaro:"#fce4ec",
      colorOscuro:"#ff0000",
       textoClaro: true
    }
,
    {
      title:"RAGGAETON",
      image:"https://www.celebtattler.com/wp-content/uploads/2018/07/J-Balvin-2016-press-billboard-650-1548.jpg",
      description:"El reggaetón es un tipo de género musical que surge a partir de una combinación entre el reggae, el hip hop y el rap el cual surgió en América Central y luego fue desplazándose con fuerza a todos los rincones del mundo.",
      colorClaro:"#66e0ff",
      colorOscuro:"#00cc00",
       textoClaro: true

    },{
      title:"K-POP",
      image:"https://tse3.mm.bing.net/th/id/OIP.4S1i24IIQiJy5LXAynFUEQHaF7?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "El K-pop, abreviatura de es un género musical que se originó en Corea del Sur y abarca una mezcla de varios estilos, incluyendo pop, hip hop, R&B, rock y música electrónica..",
      colorClaro:"#e1bee7",
      colorOscuro:"#7733ff",
       textoClaro: true
    },{
      title:" ROCK",
      image:"https://tse4.mm.bing.net/th/id/OIP.gOSopf5luEqxqjFedR8HUAHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
      description:"Rock and roll es un género musical nacido en la década de 1950 aproximadamente, en el seno de la sociedad norteamericana, ampliamente popularizado por Elvis Presley.Es el resultado del intercambio entre otros géneros predecesores, tales como el rhythm and blues, el blues, el country, el western, el doo wop y el hillbilly.",
      colorClaro:"#c8e6c9",
      colorOscuro:"#0066cc",
       textoClaro: true
    }
  ];
  constructor() {}
  cambiaColor( ){
    this.colorOscuro = !this.colorOscuro;
  }
  obtenerColor(genre: any): string {
  return this.colorOscuro ? genre.colorOscuro : genre.colorClaro;
  }
  obtenerTextoColor(): string {
  return this.colorOscuro ? 'white' : 'black';
}

}
