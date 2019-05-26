import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Favorito, FavoritosService } from 'src/app/services/favoritos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})

export class FavoritosPage implements OnInit {

  public cardItems = [];

  favs: Observable<Favorito[]>;


  constructor(
    public FavoritosService: FavoritosService

  ) {}

  ngOnInit() {
    this.favs = this.FavoritosService.getFavorites();

    this.favs.forEach(element => {
      element.forEach(item => {
        var obj: { title: string, value: number } = { title: item.id, value: item.value };
        this.cardItems.push(obj);
      })
    });

  }

  removeFavorite(favTitle){

    console.log(favTitle);

    this.favs.forEach(element => {
      element.forEach(item => {
        console.log(item.title);
        if (item.title == favTitle){
          console.log("Eliminando....");
          this.FavoritosService.removeFavorite(item.id);
        }
      })
    });

  }

}
