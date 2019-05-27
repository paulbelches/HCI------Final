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

  id: string = "Sii";
  rango: number;
  melodia: number;
  repeticionAlarm: boolean;
  volumen: number;

  melo1:boolean = false;
  melo2:boolean = false;

  repe1:boolean = false;
  repe2:boolean = false;

  confs : Observable<conf[]>;
  temp : conf;
  conf: conf = {
    persona : 'bel17088@uvg.edu.gt',
    melodia: 1,
    rango: 2,
    repeticionAlarm: false,
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
              this.global.rango = elment.rango;
              this.global.melodia = elment.melodia;
              this.global.repeticionAlarm = elment.repeticionAlarm;
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
    this.melodia = this.global.melodia;
    this.rango = this.global.rango;
    this.repeticionAlarm = this.global.repeticionAlarm;
    this.volumen = this.global.volumen;
    if (this.melodia == 1){
      this.melo1 = true;
      this.melo2 = false;
    } else {
      this.melo2 = true;
      this.melo1 = false;
    }
    if (this.repeticionAlarm){
      this.repe1 = true;
      this.repe2 = false;
    } else {
      this.repe2 = true;
      this.repe1 = false;
    }
    
  }
  logout() {
    this.navCtrl.navigateRoot('/');
  }
  home() {
    this.navCtrl.navigateForward('/menu-principal/otro/0');
  }

  update(){
    this.conf.rango = this.rango;
    this.conf.melodia = this.melodia;
    this.conf.repeticionAlarm = this.repeticionAlarm;
    this.conf.volumen = this.volumen;
    this.confService.updateConf(this.conf, this.id);
    this.home();
  }
  ionViewWillEnter(){
    this.cargar();
  }
  setMelodi(v: number){
    console.log("Se cambio");
    this.global.melodia = v;
    this.melodia = v;
  }
  setAlarm(v:boolean){
    this.global.repeticionAlarm = v;
    this.repeticionAlarm= v; 
  }
}
