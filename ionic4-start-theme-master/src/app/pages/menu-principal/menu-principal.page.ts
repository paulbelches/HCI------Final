import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';

// import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';

// import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
// import { NavController } from '@ionic/angular';

declare var google;
var map;
var service;
var directionsService;
var directionsDisplay;
var miArray: number[];
var fallo: boolean;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

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
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    public navCtrl: NavController
    ) {
  }

  ngOnInit(){
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    this.loadMap();
  }

  async loadMap()
  {
    this.myLatLng = await this.getLocation();

    // const loading = await this.loadCtrl.create();
    // loading.present();

    this.mapRef  = new google.maps.Map(document.getElementById('map'), {
      center: this.myLatLng,
      zoom: 12,
      mapTypeId: 'terrain'
    });

    directionsDisplay.setMap(this.mapRef);

    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      // console.log('added');
      // loading.dismiss();
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

    // console.log(this.lugar);

    //Comienza
    var request = {
      query: this.lugar,
      fields: ['name', 'geometry'],
    };
    service = new google.maps.places.PlacesService(this.mapRef);

    let promiseSearch=new Promise(function(resolve, reject){
      service.findPlaceFromQuery(request,function(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            searchLat = <number> results[0].geometry.viewport.ia.j;
            searchLong = <number> results[0].geometry.viewport.na.l;

            var coordsSearch = [searchLat,searchLong];
                
            resolve(coordsSearch);
        }
      });
    });

    promiseSearch.then(function(fromResolve){
      // console.log(fromResolve);
      miArray = [];
      miArray.push(fromResolve[0], fromResolve[1]);
    }).then(() => {
      // console.log(this.markers.length);
      if(this.markers.length > 1){
        this.deleteLastMarker();
      }
    }).then(() => {
      // console.log("Mi array: " + miArray);
      // this.addMarker(miArray[1], miArray[0]);
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
        window.alert("Direccion fallo.");
      }
    });

    if(!fallo){
      this.deleteLastMarker();
      this.setUbicacion();
      this.siguiente = true;
    }
  }

  pushPage(){
    this.navCtrl.navigateForward('/alarma/' + this.latOri + '/' + this.lngOri + '/' + this.latDest + '/' + this.lngDest + '/' + this.lugar);
  }
}
