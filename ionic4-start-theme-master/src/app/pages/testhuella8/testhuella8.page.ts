import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testhuella8',
  templateUrl: './testhuella8.page.html',
  styleUrls: ['./testhuella8.page.scss'],
})
export class Testhuella8Page implements OnInit {  
  public lines: number;
  passedId1 = null;
  passedId2 = null;
  passedId3 = null;
  passedId4 = null;
  passedId5 = null;
  passedId6 = null;
  passedId7 = null;
  idDoc = 0;

  constructor(
    public navCtrl: NavController, private activateRoute: ActivatedRoute,
    public alertCtrl: AlertController
  ) { 
    this.lines = -1;
  }

  ngOnInit() {
    this.lines = -1;
    this.passedId1 = this.activateRoute.snapshot.paramMap.get('myid22');
    this.passedId2 = this.activateRoute.snapshot.paramMap.get('myid23');
    this.passedId3 = this.activateRoute.snapshot.paramMap.get('myid24');
    this.passedId4 = this.activateRoute.snapshot.paramMap.get('myid25');
    this.passedId5 = this.activateRoute.snapshot.paramMap.get('myid26');
    this.passedId6 = this.activateRoute.snapshot.paramMap.get('myid27');
    this.passedId7 = this.activateRoute.snapshot.paramMap.get('myid28');
  }
  actualizarResp8(): void{
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
    this.navCtrl.navigateBack('/testhuella7/' +this.passedId1+'/'+this.passedId2+'/'+this.passedId3+'/'+this.passedId4+'/'+this.passedId5+'/'+this.passedId6);
  }
  pushPage(){
    this.navCtrl.navigateForward('/testhuella9/'+this.passedId1+'/'+this.passedId2+'/'+this.passedId3+'/'+this.passedId4+'/'+this.passedId5+'/'+this.passedId6+'/'+this.passedId7+'/'+this.lines);
  }
  goToNext9() {
    if(this.lines != -1){
      this.pushPage();
    }
    else{
      this.alertaSeleccion();
    }
  }
  goToBack7() {
    this.pushPageBack()
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

