import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Huella, HuellaCarbonoService } from 'src/app/services/huella-carbono.service';

@Component({
  selector: 'app-testhuellaresultado',
  templateUrl: './testhuellaresultado.page.html',
  styleUrls: ['./testhuellaresultado.page.scss'],
})
export class TesthuellaresultadoPage implements OnInit {
  passedId1 = null;
  passedId2 = null;
  passedId3 = null;
  passedId4 = null;
  passedId5 = null;
  passedId6 = null;
  passedId7 = null;
  passedId8 = null;
  passedId9 = null;
  sumaPuntos = null;
  sumaParcial = null;
  public calculoTierras = null;
  public alimentacion = null;
  public transporte = null;
  public energetico = null;
  public contaminacion = null;
  public agua = null;
  public alimentacionPorcentaje = null;
  public transportePorcentaje = null;
  public energeticoPorcentaje = null;
  public contaminacionPorcentaje = null;
  public aguaPorcentaje = null;
  public images1: any[] = [];
  fecha: Date = new Date();
  constructor(
    public navCtrl: NavController, private activateRoute: ActivatedRoute, public global: GlobalService,
    private HuellaCarbonoService: HuellaCarbonoService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }

  huella: Huella = {
    email : '',
    cantidadDeTierras : 0,
    porcentajeAlimentacion : 0,
    porcentajeTransporte : 0,
    porcentajeEnergetico : 0,
    porcentajeContaminacion : 0,
    porcentajeAgua : 0,
    fecha: ""
  }

  ngOnInit() {
    this.passedId1 = this.activateRoute.snapshot.paramMap.get('myid37');
    this.passedId2 = this.activateRoute.snapshot.paramMap.get('myid38');
    this.passedId3 = this.activateRoute.snapshot.paramMap.get('myid39');
    this.passedId4 = this.activateRoute.snapshot.paramMap.get('myid40');
    this.passedId5 = this.activateRoute.snapshot.paramMap.get('myid41');
    this.passedId6 = this.activateRoute.snapshot.paramMap.get('myid42');
    this.passedId7 = this.activateRoute.snapshot.paramMap.get('myid43');
    this.passedId8 = this.activateRoute.snapshot.paramMap.get('myid44');
    this.passedId9 = this.activateRoute.snapshot.paramMap.get('myid45');
    
    //Aqui hare el calculo de tierras necesarias segun los resultados del test
    this.calculoTierrasNecesarias();

    //Aqui hare el calculo de los porcentajes en que contribuye cada actividad para la huella de carbono obtenida
    this.calculoPorcentajes();
    this.huella.email = this.global.email;
    this.huella.cantidadDeTierras = this.calculoTierras;
    this.huella.porcentajeAgua = this.aguaPorcentaje;
    this.huella.porcentajeAlimentacion = this.alimentacionPorcentaje;
    this.huella.porcentajeContaminacion = this.contaminacionPorcentaje;
    this.huella.porcentajeEnergetico = this.energeticoPorcentaje;
    this.huella.porcentajeTransporte = this.transportePorcentaje;

    var date = this.fecha.getDate() + '/' + (this.fecha.getMonth()+1) + '/' +this.fecha.getFullYear() + ' ' + this.fecha.getHours() + ':' +this.fecha.getMinutes() + ':' +this.fecha.getSeconds();
    this.huella.fecha = date;
    this.saveHuella();

    this.global.datesEarth.push(date);
    this.global.earth.push(this.calculoTierras);
    
  }

  async saveHuella(){

    const loading = await this.loadingCtrl.create({
      message: 'Guardando datos...'
    });
    await loading.present();
    this.HuellaCarbonoService.addHuella(this.huella).then(() => {
      loading.dismiss();
    });
  }

  calculoTierrasNecesarias(){
    this.sumaPuntos = parseFloat(this.passedId1) + parseFloat(this.passedId2) + parseFloat(this.passedId3) + parseFloat(this.passedId4) + parseFloat(this.passedId5) + parseFloat(this.passedId6) + parseFloat(this.passedId7) + parseFloat(this.passedId8) + parseFloat(this.passedId9);
    if(this.sumaPuntos >= 500){
      this.calculoTierras = 5;
      this.images1 = []
      for (let i = 0; i < 5; i++){
        this.images1.push('assets/img/planeta.png');
      }
    }
    else if(this.sumaPuntos >= 450){
      this.calculoTierras =  4;
      this.images1 = []
      for (let i = 0; i < 4; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
    }
    else if(this.sumaPuntos >= 400){
      this.calculoTierras = 3.5;
      this.images1 = []
      for (let i = 0; i < 3; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
      this.images1.push('assets/img/medioplaneta.png'
        );
    }
    else if(this.sumaPuntos >= 350){
      this.calculoTierras = 3;
      this.images1 = []
      for (let i = 0; i < 3; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
    }
    else if(this.sumaPuntos >= 300){
      this.calculoTierras = 2.5;
      this.images1 = []
      for (let i = 0; i < 2; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
      this.images1.push('assets/img/medioplaneta.png'
      );
    }
    else if(this.sumaPuntos >= 250){
      this.calculoTierras = 2;
      this.images1 = []
      for (let i = 0; i < 2; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
    }
    else if(this.sumaPuntos >= 200){
      this.calculoTierras = 1.5;
      this.images1 = []
      for (let i = 0; i < 1; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
      this.images1.push('assets/img/medioplaneta.png'
      );  
    }
    else{
      this.calculoTierras = 1;
      this.images1 = []
      for (let i = 0; i < 1; i++){
        this.images1.push('assets/img/planeta.png'
        );
      }
    }
  }

  calculoPorcentajes(){
    //Alimenticia
    this.sumaParcial = parseFloat(this.passedId1) + parseFloat(this.passedId2);
    this.alimentacion = this.sumaParcial/this.sumaPuntos;
    this.alimentacionPorcentaje = (this.alimentacion * 100).toFixed(0).toString();
    this.alimentacion = (this.alimentacion).toFixed(2).toString();

    //Transporte
    this.sumaParcial = parseFloat(this.passedId3);
    this.transporte = this.sumaParcial/this.sumaPuntos;
    this.transportePorcentaje = (this.transporte * 100).toFixed(0).toString();
    this.transporte = (this.transporte).toFixed(2).toString();

    //Gasto Energetico
    this.sumaParcial = parseFloat(this.passedId5) + parseFloat(this.passedId6);
    this.energetico = this.sumaParcial/this.sumaPuntos;
    this.energeticoPorcentaje = (this.energetico * 100).toFixed(0).toString();
    this.energetico = (this.energetico).toFixed(2).toString();

    //Contaminacion
    this.sumaParcial = parseFloat(this.passedId4) + parseFloat(this.passedId7);
    this.contaminacion = this.sumaParcial/this.sumaPuntos;
    this.contaminacionPorcentaje = (this.contaminacion * 100).toFixed(0).toString();
    this.contaminacion = (this.contaminacion).toFixed(2).toString();

    //Agua
    this.sumaParcial = parseFloat(this.passedId8) + parseFloat(this.passedId9);
    this.agua = this.sumaParcial/this.sumaPuntos;
    this.aguaPorcentaje = (this.agua * 100).toFixed(0).toString();
    this.agua = (this.agua).toFixed(2).toString();
  }

  goToMenuPrincipal() {
    this.navCtrl.navigateBack('/bienvenida-test');
  }

  goToMenu(){
    this.navCtrl.navigateBack('/home-results');
  }

  async info() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'Puedes ver tus resultados de tu huella de carbono, y, más abajo, observarás cómo se distribuye tu huella en tus actividades.',
      buttons: ['OK'],
      cssClass: 'popUp'
    });

    await alert.present();
  }
}

