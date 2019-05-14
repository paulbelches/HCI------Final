import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testhuella3',
  templateUrl: './testhuella3.page.html',
  styleUrls: ['./testhuella3.page.scss'],
})
export class Testhuella3Page implements OnInit {
  public lines: number;
  passedId1 = null;
  passedId2 = null;
  idDoc = 0;

  constructor(
    public navCtrl: NavController, private activateRoute: ActivatedRoute,
    public alertCtrl: AlertController
  ) {
    this.lines = -1;
   }

  ngOnInit() {
    this.lines = -1;
    this.passedId1 = this.activateRoute.snapshot.paramMap.get('myid2');
    this.passedId2 = this.activateRoute.snapshot.paramMap.get('myid3');
  }

  pushPageBack(){
    this.navCtrl.navigateBack('/testhuella2/' + this.passedId1);
  }

  pushPage(){
    this.navCtrl.navigateForward('/testhuella4/' +  this.passedId1+'/'+this.passedId2+'/'+this.lines);
  }

  actualizarResp3(): void{
  }

  async alertaSeleccion(){
    const alert = await this.alertCtrl.create({
      header: 'Selección de respuesta',
      message: 'Debe de seleccionar una respuesta para poder continuar con el test.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  goToNext4() {
    if(this.lines != -1){
      this.pushPage();
    }
    else{
      this.alertaSeleccion();
    }
  }
  goToBack2() {
    this.pushPageBack();
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
