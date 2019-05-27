import { Component, OnInit } from '@angular/core';
import { Favorito, FavoritosService } from 'src/app/services/favoritos.service';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  favs: Observable<Favorito[]>;

  constructor(
    public FavoritosService: FavoritosService,
    private global: GlobalService
  ) {
    this.favs = null;
  }

  ngOnInit() {
    this.favs = this.FavoritosService.getFavorites();
    
    this.favs.forEach(element => {
      element.forEach(item => {
        this.global.contador++;
      })
    });
  }

}
