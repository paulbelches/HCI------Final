import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { conf, ConfService } from 'src/app/services/conf.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;

  languages: any = ['English', 'Portuguese', 'French'];
  paymentMethods: any = ['Paypal', 'Credit Card'];
  currencies: any = ['USD', 'BRL', 'EUR'];


  magnitud : number;
  id: string = "Sii";
  rango: number;
  repeticionAlarm: number;
  repeticionVibra: number;
  volumen: number;

  confs : Observable<conf[]>;
  temp : conf;
  conf: conf = {
    persona : 'bel17088@uvg.edu.gt',
    magnitud : 0,
    melodia: 1,
    rango: 2,
    repeticionAlarm: 0,
    repeticionVibra: 0,
    volumen: 40
  }

  constructor(public navCtrl: NavController,
    private confService: ConfService,
    private global: GlobalService,) {
      this.conf.persona = this.global.email;
      this.confs = this.confService.getConfs();
      this.confs.subscribe(
        element => {
          element.forEach(elment => {
            if(elment.persona == this.global.email){
              this.global.id = elment.id;
              this.global.magnitud = elment.magnitud;
              this.global.rango = elment.rango;
              this.global.repeticionAlarm = elment.repeticionAlarm;
              this.global.repeticionVibra = elment.repeticionVibra;
              this.global.volumen = elment.volumen; 
              this.cargar();
            }
          })
        }
      );

      this.cargar();


    }

  ngOnInit() {
    this.cargar();
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  cargar(){
    this.id = this.global.id;
    this.magnitud = this.global.magnitud;
    this.rango = this.global.rango;
    this.repeticionAlarm = this.global.repeticionAlarm;
    this.repeticionVibra = this.global.repeticionVibra;
    this.volumen = this.global.volumen;
    
  }
  logout() {
    this.navCtrl.navigateRoot('/');
  }
  home() {
    this.navCtrl.navigateForward('/menu-principal/otro/0');
  }

  update(){
    this.conf.magnitud = this.magnitud;
    this.conf.rango = this.rango;
    this.conf.repeticionAlarm = this.repeticionAlarm;
    this.conf.repeticionVibra = this.repeticionVibra;
    this.conf.volumen = this.volumen;
    this.confService.updateConf(this.conf, this.id);
    this.home();
  }
  ionViewWillEnter(){
    this.cargar();
  }
}
