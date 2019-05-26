import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import { AlarmaPageModule } from './alarma.module';


declare var google;

@Component({
  selector: 'app-alarma',
  templateUrl: './alarma.page.html',
  styleUrls: ['./alarma.page.scss'],
})



export class AlarmaPage implements OnInit 
{

  latOri = null;
  lngOri = null;
  latDest = null;
  lngDest = null;
  lugar = null;
  tiempo=null;
  distancia=null;
  
  controlFav=true;

  passedVar=null;
  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    public navCtrl: NavController,
    private activateRoute: ActivatedRoute
    ) 
  {
    this.latOri =parseFloat(this.activateRoute.snapshot.paramMap.get('latOri'));
    this.lngOri = parseFloat(this.activateRoute.snapshot.paramMap.get('lngOri'));
    this.latDest = parseFloat(this.activateRoute.snapshot.paramMap.get('latDest'));
    this.lngDest = parseFloat(this.activateRoute.snapshot.paramMap.get('lngDest'));
    this.lugar = this.activateRoute.snapshot.paramMap.get('lugar');
    this.getTimeAndDist(this.latOri,this.lngOri,this.latDest,this.lngDest);

    


    console.log(this.latOri);
    console.log(this.lngOri);
    console.log(this.latDest);
    console.log(this.lngDest);
    console.log(this.lugar);

     



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
    this.passedVar=porcentaje;
    
        
  }
  
  timerTick()
   {
     
    setTimeout( () => {
      this.tiempo=localStorage['tiempo'];
      this.distancia=localStorage['distancia'];
      this.getPorcentaje();


      
      
  
            
        this.timerTick();
    }, 1000);
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
    this.timerTick();  
    console.log(this.latOri);
    console.log(this.lngOri);
    console.log(this.lngOri);
    console.log(this.latDest);
    console.log(this.lngDest);
    
    
    
    
    
   

    





  }

}
