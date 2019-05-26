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
  contador: number;

  constructor(
    public FavoritosService: FavoritosService,
    private global: GlobalService
  ) {
    this.contador = 0;
  }

  ngOnInit() {
    console.log(this.global.nombre)
    this.favs = this.FavoritosService.getFavorites();
    console.log(this.favs);
    

    this.favs.forEach(element => {
      element.forEach(item => {
        console.log(item);
        this.contador++;
      })
    });
    console.log(this.contador);

  }



}
