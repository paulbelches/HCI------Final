import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testhuella6',
  templateUrl: './testhuella6.page.html',
  styleUrls: ['./testhuella6.page.scss'],
})
export class Testhuella6Page implements OnInit {
  public lines: number;
  passedId1 = null;
  passedId2 = null;
  passedId3 = null;
  passedId4 = null;
  passedId5 = null;
  idDoc = 0;

  constructor(
    public navCtrl: NavController, private activateRoute: ActivatedRoute,
    public alertCtrl: AlertController
  ) { 
    this.lines = -1;
  }

  ngOnInit() {
    this.lines = -1;
    this.passedId1 = this.activateRoute.snapshot.paramMap.get('myid11');
    this.passedId2 = this.activateRoute.snapshot.paramMap.get('myid12');
    this.passedId3 = this.activateRoute.snapshot.paramMap.get('myid13');
    this.passedId4 = this.activateRoute.snapshot.paramMap.get('myid14');
    this.passedId5 = this.activateRoute.snapshot.paramMap.get('myid15');
  }
  actualizarResp6(): void{
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
    this.navCtrl.navigateBack('/testhuella5/' +this.passedId1+'/'+this.passedId2+'/'+this.passedId3+'/'+this.passedId4);
  }
  pushPage(){
    this.navCtrl.navigateForward('/testhuella7/'  +this.passedId1+'/'+this.passedId2+'/'+this.passedId3+'/'+this.passedId4+'/'+this.passedId5+'/'+this.lines);
  }
  goToNext7() {
    if(this.lines != -1){
      this.pushPage();
    }
    else{
      this.alertaSeleccion();
    }
  }
  goToBack5() {
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
