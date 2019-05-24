import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';

// import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';

// import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
// import { NavController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  mapRef = null;
  overlay = null;
  marker: any;
  myLatLng: any;

  // @ViewChild('map') mapElement: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController
    ) {
  }

  ngOnInit(){
    this.loadMap();
  }

  async loadMap(){

    this.myLatLng = await this.getLocation();

    this.presentToast(this.myLatLng.lat + " <=> " + this.myLatLng.lng);

    // const loading = await this.loadCtrl.create();
    // loading.present();
     
    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef  = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });

    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      console.log('added');
      // loading.dismiss();

      this.addMarker(this.myLatLng.lat, this.myLatLng.lng);
    })

    google.maps.event
    .addListener(this.mapRef, 'click', () => {
      console.log("Hiciste clic en mapa");
    })

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
  
    this.nativeGeocoder.reverseGeocode(this.myLatLng.lat, this.myLatLng.lng, options)
      .then((result: NativeGeocoderResult[]) => this.presentToast(JSON.stringify(result[0])))
      .catch((error: any) => this.presentToast(error));
    
    // this.nativeGeocoder.forwardGeocode('Berlin', options)
    //   .then((coordinates: NativeGeocoderResult[]) => this.presentToast('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
    //   .catch((error: any) => this.presentToast(error));
  }

  async presentToast(message: any){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  private addMarker(lat: number, lng: number){
    this.marker = new google.maps.Marker({
      map: this.mapRef,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat, lng }
    });
  }

  private async getLocation(){
    const rta = await this.geolocation.getCurrentPosition()
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    }
  }

  showLocation(){
    this.presentToast(this.myLatLng.lat + " <=> " + this.myLatLng.lng);
  }

}
