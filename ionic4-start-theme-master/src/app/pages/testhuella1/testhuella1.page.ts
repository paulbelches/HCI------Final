import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { PassThrough } from 'stream';
import { LineToLineMappedSource } from 'webpack-sources';

@Component({
  selector: 'app-testhuella1',
  templateUrl: './testhuella1.page.html',
  styleUrls: ['./testhuella1.page.scss'],
})
export class Testhuella1Page implements OnInit {
  public lines: number;
  idDoc = 0;

  constructor(
    public navCtrl: NavController, public alertCtrl: AlertController
  ) { 
    this.lines = -1;
  }

  ngOnInit() {
    this.lines = -1;
  }

  actualizarResp1(): void{
  }
  
  pushPage(){
    this.navCtrl.navigateForward('/testhuella2/' + this.lines);
  }

  async alertaSeleccion(){
    const alert = await this.alertCtrl.create({
      header: 'Selección de respuesta',
      message: 'Debe de seleccionar una respuesta para poder continuar con el test.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  goToNext2() {
    if(this.lines != -1){
      this.pushPage();
    }
    else{
      this.alertaSeleccion();
    }
  }
  goToBack() {
    this.navCtrl.navigateBack('/bienvenida-test');
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