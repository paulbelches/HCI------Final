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
    public navCtrl: NavController,
    public alertController: AlertController

  ) {}

  ngOnInit() {
    this.favs = this.FavoritosService.getFavorites();

    this.favs.forEach(element => {
      element.forEach(item => {
        var obj: { title: string, value: number} =
        { title: item.id, value: item.value };
        this.cardItems.push(obj);
      })
    });

  }

  async removeFavorite(favTitle){

    const alert = await this.alertController.create({
      header: 'Eliminar de favoritos',
      message: '¿Desea eliminar <strong>' + favTitle + '</strong> de favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("Cancelado");
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.favs = this.FavoritosService.getFavorites();

            this.favs.forEach(element => {
              element.forEach(item => {
                if (item.id == favTitle)
                  this.FavoritosService.removeFavorite(item.id);
              })
            });

            location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: 'Elemento eliminado de la lista de favoritos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  pushAlarm(favTitle) {

    this.navCtrl.navigateForward('/menu-principal/favorito' + '/' + 'UVG');
  }

}
