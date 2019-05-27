import { Component, OnInit } from '@angular/core';
import { Favorito, FavoritosService } from 'src/app/services/favoritos.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})

export class FavoritosPage implements OnInit {

  public cardItems = [];

  favs: Observable<Favorito[]>;
  prueba: Observable<Favorito[]>;


  constructor(
    public FavoritosService: FavoritosService,
    public navCtrl: NavController

  ) {}

  ngOnInit() {
    this.favs = this.FavoritosService.getFavorites();

    this.favs.forEach(element => {
      element.forEach(item => {
        var obj: { title: string, value: number, lat: number, lng: number } =
        { title: item.id, value: item.value, lat: item.lat, lng: item.lng };
        this.cardItems.push(obj);
      })
    });

  }

  removeFavorite(favTitle){

    this.favs.forEach(element => {
      element.forEach(item => {
        console.log(item.id);
        if (item.title == favTitle){
          console.log("Eliminando....", item.id);
          this.FavoritosService.removeFavorite(item.id);
        }
      })
    });

  }

  pushAlarm(favTitle) {

    this.navCtrl.navigateForward('/menu-principal/favorito' + '/' + 'UVG');
  }

}
