import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult, } from '@ionic-native/native-geocoder/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { Favorito, FavoritosService } from 'src/app/services/favoritos.service';
import { AlarmaPageModule } from './alarma.module';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';


declare var google;

@Component({
  selector: 'app-alarma',
  templateUrl: './alarma.page.html',
  styleUrls: ['./alarma.page.scss'],
})

export class AlarmaPage implements OnInit 
{

  favs: Observable<Favorito[]>;

  latOri = null;
  lngOri = null;
  latDest = null;
  lngDest = null;
  lugar = null;
  tiempo=null;
  distancia=null;
  audio=null;
  rango=null;
  varControl = null;
  controlFav=true;
  controlVentanaPararAlarma=null;

  passedVar=null;

  newFavorito : Favorito;

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    public navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    public FavoritosService: FavoritosService,
    public alertController: AlertController,
    private global: GlobalService
    ) 
  {
    this.latOri =parseFloat(this.activateRoute.snapshot.paramMap.get('latOri'));
    this.lngOri = parseFloat(this.activateRoute.snapshot.paramMap.get('lngOri'));
    this.latDest = parseFloat(this.activateRoute.snapshot.paramMap.get('latDest'));
    this.lngDest = parseFloat(this.activateRoute.snapshot.paramMap.get('lngDest'));
    this.lugar = this.activateRoute.snapshot.paramMap.get('lugar');
    this.getTimeAndDist(this.latOri,this.lngOri,this.latDest,this.lngDest);

    if(global.melodia==1)
    {
      this.audio = new Audio('assets/sounds/alarma1.mp3');
    }
    else
    {
      this.audio = new Audio('assets/sounds/alarma2.mp3');
    }

    this.audio.volume=global.volumen;

    

    //console.log(this.latOri);
    //console.log(this.lngOri);
    //console.log(this.latDest);
    //console.log(this.lngDest);
    //console.log(this.lugar);

    console.log(global.melodia);
    console.log(global.volumen);
    console.log(global.repeticionAlarm);
    console.log(global.rango);
    this.rango=global.rango;

   }

   private async getLocation(){
    const rta = await this.geolocation.getCurrentPosition()
    this.latOri = rta.coords.latitude;
    this.lngOri = rta.coords.longitude;
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    }
  }

  async getPorcentaje()
  {
    var x = await this.getLocation();
    this.getDistancia(x.lat,x.lng,this.latDest,this.lngDest);
    var porcentaje=(localStorage['distanciaTotal'] - localStorage['distanciaNum']) / localStorage['distanciaTotal'];
    console.log("Distancia Inicial"+localStorage['distanciaTotal']);
    console.log("Distancia Actual"+localStorage['distanciaNum']);
    if(porcentaje<0)
    {
      this.passedVar=0;

    }
    else
    {
      this.passedVar=porcentaje;
    }
    
    if (localStorage['distanciaNum']<=this.rango)
    {
      if(this.controlVentanaPararAlarma)
      {
        this.audio.play();
        this.error();
        this.controlVentanaPararAlarma=false;
      }
      
      
    }
    
    console.log(this.passedVar);
    
        
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'ALARMA',
      message: '¿Desea detener la alarma?',
      buttons: [
        {
          text: 'Confirmar',
          handler: async data => {
            this.audio.pause();
            this.varControl = false;
            this.navCtrl.navigateForward('/menu-principal/otro/0');
          }
        }
      ]
    });

    await alert.present();
}
  
  timerTick()
   {
    if(this.varControl)
    { 
    setTimeout( () => {
      this.tiempo=localStorage['tiempo'];
      this.distancia=localStorage['distancia'];
      this.getPorcentaje();
      this.timerTick();
    }, 2000);}
   }

   guardarInfo(parametro)
   {
     console.log(parametro);

   }

   getDistancia(latOrigen,lngOrigen,latDest,lngDest)
  { 
    var origin = {lat: latOrigen, lng: lngOrigen};
    var destination = {lat: latDest, lng: lngDest};
    var geocoder = new google.maps.Geocoder;
    var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin],
          destinations:  [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        },function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {

              var results = response.rows[0].elements;
              var distancia=results[0].distance.value;
              localStorage['distanciaNum']=distancia;


          }
        });



  }

  getTimeAndDist(latOrigen,lngOrigen,latDest,lngDest)
  {
    var origin = {lat: latOrigen, lng: lngOrigen};
    var destination = {lat: latDest, lng: lngDest};
    var geocoder = new google.maps.Geocoder;
    var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin],
          destinations:  [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        },function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {

              var results = response.rows[0].elements;
              var tiempo=results[0].duration.text;
              var distancia=results[0].distance.text;
              console.log(tiempo);
              console.log(distancia);
              localStorage['tiempo']=tiempo;
              localStorage['distancia']=distancia;
              var distancia=results[0].distance.value;
              localStorage['distanciaTotal']=distancia;

          }
        });



  }


  ngOnInit()
  {
    this.varControl = true;
    this.timerTick();
    this.existsInFirebase();
    this.controlVentanaPararAlarma=true;
    
  }

  checkExistence(){
    if (this.controlFav)
      this.agregarFavoritos();
    else
      this.alertaExistente();
  }


  async agregarFavoritos() {

    const alert = await this.alertController.create({
      header: 'Agregar a favoritos',
      message: '¿Desea agregar <strong>' + this.lugar + '</strong> a favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("Cancelado");
          }
        }, {
          text: 'Agregar',
          handler: () => {
            this.newFavoriteFirebase();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: '<strong>' + this.lugar + '</strong> ha sido agregado a la lista de favoritos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaExistente() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: '<strong>' + this.lugar + '</strong> ya existe en su lista de favoritos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  newFavoriteFirebase(){
    this.newFavorito = {
      value: 1
    }

    if (this.FavoritosService.addFavorite(this.newFavorito, this.lugar)){
      this.presentAlert();
      this.controlFav = false;
    }
  }

  existsInFirebase(){
    this.favs = this.FavoritosService.getFavorites();

    this.favs.forEach(element => {
      element.forEach(item => {
        if (item.id == this.lugar){
          this.controlFav = false;
        }
      })
    });
  }

}
