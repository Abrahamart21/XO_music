import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { SongModalPage } from '../song-modal/song-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  colorOscuro: boolean = true;
  genres = [{
    title: "Musica POP",
    image: "https://webmediums.com/media/max_1200/1*EIL2v8UkmN1qElm5JXAWVQ.jpeg",
    description: "La música pop es un estilo musical derivado de la música popular...",
  
    textoClaro: true
  },
  {
    title: "RAGGAETON",
    image: "https://www.celebtattler.com/wp-content/uploads/2018/07/J-Balvin-2016-press-billboard-650-1548.jpg",
    description: "El reggaetón es un tipo de género musical...",
   
    textoClaro: true
  },
  {
    title: "K-POP",
    image: "https://tse3.mm.bing.net/th/id/OIP.4S1i24IIQiJy5LXAynFUEQHaF7?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "El K-pop es un género musical que se originó en Corea del Sur...",
   
    textoClaro: true
  },
  {
    title: "ROCK",
    image: "https://tse4.mm.bing.net/th/id/OIP.gOSopf5luEqxqjFedR8HUAHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Rock and roll es un género musical nacido en los 50s...",
   
    textoClaro: true
  }];

  tracks: any;
  albums: any;
  localArtist: any;
  artists: any[] = [];

  song: any = {
    name: '',
    preview_url: '',
    playing: false,
    isFavorite: false,
    id: ''
  };

  currentSong: any;
  newTime: any = {};

  userId: string = "1"; // Usuario por defecto

  constructor(
    private storageService: StorageService,
    private musicService: MusicService,
    private modalController: ModalController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getLocalArtist();
    this.loadAlbums();
    this.loadTracks();
    this.loadArtists();
   const savedColor = await this.storageService.get('tema-color');
this.colorOscuro = savedColor !== 'claro';
document.body.classList.add(this.colorOscuro ? 'tema-oscuro' : 'tema-claro');

  }

  verIntro() {
    this.router.navigateByUrl('/intro');
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => this.tracks = tracks);
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => this.albums = albums);
  }

  loadArtists() {
    this.musicService.getArtistsFromServer().then(artists => this.artists = artists);
  }

 async cambiaColor() {
  this.colorOscuro = !this.colorOscuro;
  const tema = this.colorOscuro ? 'oscuro' : 'claro';
  await this.storageService.set('tema-color', tema);

  // Aplica la clase al body
  document.body.classList.remove('tema-claro', 'tema-oscuro');
  document.body.classList.add(this.colorOscuro ? 'tema-oscuro' : 'tema-claro');
}


  obtenerColor(genre: any): string {
    return this.colorOscuro ? genre.colorOscuro : genre.colorClaro;
  }

  obtenerTextoColor(): string {
    return this.colorOscuro ? 'white' : 'black';
  }

  getLocalArtist() {
    this.localArtist = this.musicService.getLocalArtists();
  }

  async showSongs(albumId: string) {
    const songs = await this.musicService.getSongsByAlbum(albumId);
    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: { songs }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.song = result.data;
        await this.checkIfFavorite(this.song.id); // ✅ Verificar favorito
      }
    });

    modal.present();
  }

  async showSongsByArtist(artistId: string) {
    const songs = await this.musicService.getSongsByArtist(artistId);
    const modal = await this.modalController.create({
      component: SongModalPage,
      componentProps: { songs }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.song = result.data;
        await this.checkIfFavorite(this.song.id); // ✅ Verificar favorito
      }
    });

    modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();

    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    });

    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) {
      return 0;
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

  // ✅ Validar si la canción está en favoritos
  async checkIfFavorite(songId: string) {
    try {
      const result = await this.musicService.isFavorite(songId, this.userId);
      this.song.isFavorite = result.isFavorite;
    } catch (error) {
      console.error("Error al verificar favorito:", error);
      this.song.isFavorite = false;
    }
  }

  // ✅ Agregar o quitar de favoritos
 toggleFavorite() {
  const songId = this.song.id;

  if (!songId) return;

  if (this.song.isFavorite) {
    this.musicService.removeFavorite(songId, this.userId).then(() => {
      this.song.isFavorite = false;
    });
  } else {
    this.musicService.addFavorite(songId, this.userId).then(() => {
      this.song.isFavorite = true;
    });
  }
}

}
