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
        title: 'Menú principal',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Acerca de Solars',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'Propósito de Solars',
        url: '/settings',
        direct: 'forward',
        icon: 'globe'
      },
      {
        title: 'Estadísticas',
        url: '/graphics',
        direct: 'forward',
        icon: 'stats'
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
