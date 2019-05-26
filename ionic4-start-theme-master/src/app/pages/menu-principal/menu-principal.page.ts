import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { persona, PersonasService } from '../../services/persona.service';
import { Observable } from 'rxjs';

declare var google;
var map;
var service;
var directionsService;
var directionsDisplay;
var miArray: number[];
var fallo: boolean;
var nombreLugar;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  personas : Observable<persona[]>;

  mapRef = null;
  overlay = null;
  marker: any;
  markers = [];
  myLatLng: any;
  lugar = "";
  siguiente = false;
  latDest: number;
  lngDest: number;
  latOri: number;
  lngOri: number;

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    public toastController: ToastController,
    public navCtrl: NavController,
    private global: GlobalService,
    private PersonasService: PersonasService,
    public alertCtrl: AlertController,
    ) {
      console.log("Correoooo: " + this.global.email);

      this.personas = this.PersonasService.getpersonas();

      this.personas.subscribe(
        element => {
          element.forEach(elment => {
            // console.log("elemento:")
            // console.log(elment);
            if(elment.email == this.global.email){
              this.saveName(elment.nombre.toString(), elment.id);
            }
          })
        }
      )
  }

  saveName(nombre: string, id: string){
    this.global.nombre = nombre;
    this.global.idDoc = id;
    console.log(this.global.idDoc);
  }

  ngOnInit(){
    
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    this.loadMap();
  }

  ionViewWillEnter() {
    
  }

  async loadMap(){
    this.myLatLng = await this.getLocation();

    const loading = await this.loadCtrl.create();
    loading.present();

    this.mapRef  = new google.maps.Map(document.getElementById('map'), {
      center: this.myLatLng,
      zoom: 12,
      mapTypeId: 'terrain'
    });

    directionsDisplay.setMap(this.mapRef);

    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMarker(this.myLatLng.lat, this.myLatLng.lng);
    });
  }

  async presentToast(message: any){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  addMarker(lat: number, lng: number){
    this.marker = new google.maps.Marker({
      map: this.mapRef,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat, lng }
    });

    this.markers.push(this.marker);

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

  showLocation(){
    this.presentToast(this.myLatLng.lat + " <=> " + this.myLatLng.lng);
  }

  setUbicacion(){
    var searchLat=0;
    var searchLong=0;

    var request = {
      query: this.lugar,
      fields: ['name', 'geometry'],
    };
    service = new google.maps.places.PlacesService(this.mapRef);

    let promiseSearch=new Promise(function(resolve, reject){
      service.findPlaceFromQuery(request,function(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            nombreLugar=results[0].name;
            searchLat = <number> results[0].geometry.viewport.ia.j;
            searchLong = <number> results[0].geometry.viewport.na.l;

            var coordsSearch = [searchLat,searchLong];
                
            resolve(coordsSearch);
        }
      });
    });

    promiseSearch.then(function(fromResolve){
      miArray = [];
      miArray.push(fromResolve[0], fromResolve[1]);
    }).then(() => {
      if(this.markers.length > 1){
        this.deleteLastMarker();
      }
    }).then(() => {
      this.latDest = miArray[1];
      this.lngDest = miArray[0];
    });
  }

  deleteLastMarker(){
    if(this.markers.length > 0){
      this.markers[this.markers.length - 1].setMap(null);
      this.markers.pop();
    }
  }

  calculateAndDisplayRoute(){
    directionsService.route({
      origin: this.myLatLng,
      destination: this.lugar,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if(status === 'OK'){
        fallo = false;
        directionsDisplay.setDirections(response);
      }else{
        fallo = true;
      }
    });

    if(!fallo){
      this.deleteLastMarker();
      this.setUbicacion();
      this.siguiente = true;
    }else{
      this.errorMensaje();
    }
  }

  pushPage(){
    this.navCtrl.navigateForward('/alarma/' + this.latOri + '/' + this.lngOri + '/' + this.latDest + '/' + this.lngDest + '/' + nombreLugar);
  }

  async errorMensaje(){
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se ha podido encontrar la dirección ingresada.',
      buttons: ['OK'],
      cssClass: 'popUp'
    });

    await alert.present();
  }

  async ayuda() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: '1. En primer lugar, debes ingresar la dirección a la que deseas dirigirte.<br>2. Luego, debes presionar el buton "Ubicar" para verificar la existencia de la dirección ingresada.<br>3. Finalmente, debes presionar en "Nueva alarma" para encontrar el tiempo estimado y la distancia a recorrer.',
      buttons: ['OK'],
      cssClass: 'popUp'
    });

    await alert.present();
  }
}
