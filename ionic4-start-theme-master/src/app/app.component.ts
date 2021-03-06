import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { GlobalService } from '../app/services/global.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name: string = "no hay"
  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public global: GlobalService
  ) {
    this.appPages = [
      {
        title: 'Ruta Manual',
        url: '/menu-principal/otro/0',
        direct: 'forward',
        icon: 'globe'
      },
      {
        title: 'Favoritos',
        url: '/favoritos',
        direct: 'forward',
        icon: 'star'
      },
      {
        title: 'Perfil',
        url: '/perfil',
        direct: 'forward',
        icon: 'person'
      },
      {
        title: 'Configuración',
        url: '/settings',
        direct: 'forward',
        icon: 'settings'
      },
      {
        title: 'Acerca de GeoWakeUp',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'Ayuda',
        url: '/help',
        direct: 'forward',
        icon: 'help'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }
  
  ionViewDidEnter(){
    this.name = this.global.nombre;
  }
}
