import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController} from '@ionic/angular';
@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.page.html',
  styleUrls: ['./song-modal.page.scss'],
  standalone: true,
  imports: [ CommonModule,  FormsModule, IonicModule]
})
export class SongModalPage implements OnInit {
  
  songs: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs']
    console.log("recibi: ", this.songs)
  }


  async selectSong(song:any){
    console.log(" cansion selecionada: ", song)
    await this.modalCtrl.dismiss(song)

  }

}
