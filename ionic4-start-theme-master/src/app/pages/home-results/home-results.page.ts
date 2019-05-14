import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { calculadora, CalculadoraEnergeticaService } from 'src/app/services/calculadora-energetica.service';
import { Huella, HuellaCarbonoService } from 'src/app/services/huella-carbono.service';

import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
import { ImagePage } from './../modal/image/image.page';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';
import { persona, PersonasService } from '../../services/persona.service';
import { Observable } from 'rxjs';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { stringify } from 'querystring';
import { element } from '@angular/core/src/render3';
import { userInfo } from 'os';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit{
  calculadora : Observable<calculadora[]>;
  test: Observable<Huella[]>;

  cualquierCosa: string = "";
  nombre: string = "";

  personas : Observable<persona[]>;

  searchKey = '';
  themeCover = 'assets/img/Calc1.png';
  themeCover2 = 'assets/img/Bulb3.png';
  username = null;
  key : string = "";
  usuarios : Observable<Usuario[]>;
  user: Usuario[] = [];
  usuario : Usuario = {
    email : 'no papi',
    nombre : 'Paul Belches' ,
    cantidadDeTierras : 0,
    porcentajeAlimentacion : 0,
    porcentajeTransporte : 0,
    porcentajeEnergetico : 0,
    porcentajeContaminacion : 0,
    porcentajeAgua : 0,
    consumoTotal: 0,
    paneles: 0
  }

  constructor (
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    private UsuarioService: UsuarioService,
    public global: GlobalService,
    private PersonasService: PersonasService,
    private CalculadoraEnergeticaService: CalculadoraEnergeticaService,
    private HuellaCarbonoService: HuellaCarbonoService
  ) {
    this.test = this.HuellaCarbonoService.getHuellas();
    this.calculadora = this.CalculadoraEnergeticaService.getcalculadoras();

    this.test.forEach(element => {
      element.forEach(elment => {
        if(elment.email == this.global.email){
          this.saveData2(elment.fecha, elment.cantidadDeTierras);
        }
      })
    })
    
    
    this.calculadora.forEach(element => {
      element.forEach(elment => {
        if(elment.email == this.global.email){
          this.saveData1(elment.fecha, elment.paneles);
        }
      })
    })
  }

  ionViewDidLoad(){
  }

  saveData1(fecha: string, panel: number){
    this.global.dates.push(fecha);
    this.global.paneles.push(panel);
  }

  saveData2(fecha: string, tierra: number){
    this.global.datesEarth.push(fecha);
    this.global.earth.push(tierra);
  }
  
  ngOnInit() {
    this.global.idDoc = "Hola, soy Javier";
    this.username = this.route.snapshot.paramMap.get('usuario');

    if(this.global.email != null){
      
    }else{
      this.global.email = this.username;
    }
    
    this.usuarios = this.UsuarioService.getUsers();
    this.personas = this.PersonasService.getpersonas();
    this.getId();
  }

  refresh(): void{
    window.location.reload();
  }

  getId(){
    this.usuarios.subscribe(
      element => {
        element.forEach(elment => {
          if(elment.email == this.username){
            this.saveID(elment.id);
            this.getUser();
          }
        });
      }
    )
  }

  getUser(){
    this.UsuarioService.getUser(this.global.idDoc.toString()).subscribe(
      element => {
        this.saveData(element.email, element.nombre.toString(), element.cantidadDeTierras,
          element.porcentajeAgua, element.porcentajeTransporte, element.porcentajeEnergetico,
          element.porcentajeContaminacion, element.porcentajeAgua, 
          element.consumoTotal, element.paneles);
      }
    )
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);

  }


  settings() {
    this.navCtrl.navigateForward('settings');
  }

  goToEnergy() {
    this.navCtrl.navigateForward('/energy');
  }

  goToBienvenida() {
    this.navCtrl.navigateForward('/bienvenida-test');
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  saveID(id: string){
    this.global.idDoc = id;
    //this.getUser();
  }

  saveData(email: string, nombre: string, cantTierra: number, porAl: number,
    porTran: number, porEner: number, porCont: number, porAg: number,
    conT: number, panel: number){
    
      this.usuario.email = email;
      this.usuario.nombre = nombre;
      this.usuario.cantidadDeTierras = cantTierra;
      this.usuario.porcentajeAlimentacion = porAl;
      this.usuario.porcentajeTransporte = porTran;
      this.usuario.porcentajeEnergetico = porEner;
      this.usuario.porcentajeContaminacion = porCont;
      this.usuario.porcentajeAgua = porAg;
      this.usuario.consumoTotal = conT;
      this.usuario.paneles = panel;
  }

  async info() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: 'Al ver a la izquierda, puedes observar un menú desplegable con más opciones (<ion-icon name="menu"></ion-icon>). <br>También, puedes seleccionar cualquiera de las dos opciones presentes para calcular tu huella de carbono y tu consumo energético mensual.',
      buttons: ['OK'],
      cssClass: 'popUp'
    });

    await alert.present();
  }
}
