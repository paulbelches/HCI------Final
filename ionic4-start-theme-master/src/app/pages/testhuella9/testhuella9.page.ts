import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testhuella9',
  templateUrl: './testhuella9.page.html',
  styleUrls: ['./testhuella9.page.scss'],
})
export class Testhuella9Page implements OnInit {
  public lines:number;
  passedId1 = null;
  passedId2 = null;
  passedId3 = null;
  passedId4 = null;
  passedId5 = null;
  passedId6 = null;
  passedId7 = null;
  passedId8 = null;
  constructor(
    public navCtrl: NavController, private activateRoute: ActivatedRoute,
    public alertCtrl: AlertController
  ) { 
    this.lines = -1;
  }

  ngOnInit() {
    this.lines = -1;
    this.passedId1 = this.activateRoute.snapshot.paramMap.get('myid29');
    this.passedId2 = this.activateRoute.snapshot.paramMap.get('myid30');
    this.passedId3 = this.activateRoute.snapshot.paramMap.get('myid31');
    this.passedId4 = this.activateRoute.snapshot.paramMap.get('myid32');
    this.passedId5 = this.activateRoute.snapshot.paramMap.get('myid33');
    this.passedId6 = this.activateRoute.snapshot.paramMap.get('myid34');
    this.passedId7 = this.activateRoute.snapshot.paramMap.get('myid35');
    this.passedId8 = this.activateRoute.snapshot.paramMap.get('myid36');
  }
  actualizarResp9(): void{
  }
  async alertaSeleccion(){
    const alert = await this.alertCtrl.create({
      header: 'Selección de respuesta',
      message: 'Debe de seleccionar una respuesta para poder continuar con el test.',
      buttons: ['OK']
    });
    return await alert.present();
  }
  pushPageBack(){
    this.navCtrl.navigateBack('/testhuella8/'+this.passedId1+'/'+this.passedId2+'/'+this.passedId3+'/'+this.passedId4+'/'+this.passedId5+'/'+this.passedId6+'/'+this.passedId7);
  }
  pushPage(){
    this.navCtrl.navigateForward('/testhuellaresultado/'+this.passedId1+'/'+this.passedId2+'/'+this.passedId3+'/'+this.passedId4+'/'+this.passedId5+'/'+this.passedId6+'/'+this.passedId7+'/'+this.passedId8+'/'+this.lines);
  }
  goToResultado() {
    if(this.lines != -1){
      this.pushPage();
    }
    else{
      this.alertaSeleccion();
    }
  }
  goToBack8() {
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
