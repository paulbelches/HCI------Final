import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida-test',
  templateUrl: './bienvenida-test.page.html',
  styleUrls: ['./bienvenida-test.page.scss'],
})
export class BienvenidaTestPage implements OnInit {

  idDoc = 0;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) {}

  ngOnInit() {
  }

  slideDidLoad(slides: IonSlides){
    slides.startAutoplay();
  }
  
  goToNext1() {
    this.navCtrl.navigateForward('/testhuella1');
  }
  goToMenu() {
    //this.pushPage('/home-results/');
    this.navCtrl.navigateBack('/home-results/');
  }

  async info() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'Debes contestar este test conscientemente para obtener un resultado real sobre tu huella de carbono. <br>No puedes dejar ninguna respuesta en blanco.',
      buttons: ['OK'],
      cssClass: 'popUp'
    });

    await alert.present();
  }
}