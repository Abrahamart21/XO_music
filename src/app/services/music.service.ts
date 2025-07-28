import { Injectable } from '@angular/core';
import * as dataArtists from './artistas.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = 'https://music.fly.dev';

  constructor() {}

  // Obtener todas las canciones
  getTracks() {
    return fetch(`${this.urlServer}/tracks`).then(res => res.json());
  }

  // Obtener todos los álbumes
  getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(res => res.json());
  }

  // Obtener artistas locales desde JSON
  getLocalArtists() {
    return dataArtists;
  }

  // Obtener canciones por ID de álbum
  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(res => res.json());
  }

  // Obtener artistas desde el servidor
  getArtistsFromServer() {
    return fetch(`${this.urlServer}/artists`).then(res => res.json());
  }

  // Obtener canciones por artista (ID)
  getSongsByArtist(artistId: string) {
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`).then(res => res.json());
  }

  // Obtener artista por ID (opcional)
  getArtistById(artistId: string) {
    return fetch(`${this.urlServer}/artists/${artistId}`).then(res => res.json());
  }

  // ✅ FAVORITOS: Agregar a favoritos
  addFavorite(trackId: string, userId: string) {
  return fetch(`${this.urlServer}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ track_id: trackId, user_id: userId })
  }).then(res => res.json());
}


  // ✅ FAVORITOS: Eliminar de favoritos
  removeFavorite(trackId: string, userId: string) {
  return fetch(`${this.urlServer}/favorites/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ track_id: trackId, user_id: userId })
  }).then(res => res.json());
}


  // ✅ FAVORITOS: Verificar si está en favoritos
  isFavorite(trackId: string, userId: string) {
  return fetch(`${this.urlServer}/favorites/check?track_id=${trackId}&user_id=${userId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo verificar si es favorito");
      }
      return res.json();
    });
}


}
