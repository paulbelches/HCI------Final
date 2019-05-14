import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSlides, ModalController, NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ImagePage } from './../modal/image/image.page';
import { DeviceValidator } from '../energy/deviceValidatos';
import { HourValidator } from '../energy/hourValidatos';
import { DayValidator } from '../energy/dayValidatos';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-energy',
  templateUrl: './energy.page.html',
  styleUrls: ['./energy.page.scss'],
})
export class EnergyPage implements OnInit {
  myForm: FormGroup;

  @ViewChild('slideWithNav') slideWithNav: IonSlides;
  @ViewChild('cantInput') cantInput;
  
  slider: any;
  themeCover = 'assets/img/leftArrow.png';
  themeCover2 = 'assets/img/rightArrow.png';
  image = 'assets/img/e2.png';
  id = 0;
  public availableImage = true;
  public verifyImage = true;
  public go = true;
  consumo = 0;

  i1 = 'assets/img/transparent.png';
  i2 = 'assets/img/transparent.png';
  i3 = 'assets/img/transparent.png';
  i4 = 'assets/img/transparent.png';
  i5 = 'assets/img/transparent.png';
  i6 = 'assets/img/transparent.png';
  i7 = 'assets/img/transparent.png';
  i8 = 'assets/img/transparent.png';
  i9 = 'assets/img/transparent.png';
  i10 = 'assets/img/transparent.png';
  i11 = 'assets/img/transparent.png';
  i12 = 'assets/img/transparent.png';

  contador = 0;
  lista = [];
  arreglo = [];

  slide = {
    initialSlide: 0,
    slidesPerView: 1,
    loop: true
  };

  slide2 = {
    initialSlide: 1,
    slidesPerView: 1,
    loop: true
  };

  constructor(public modalCtrl: ModalController, private formBuilder: FormBuilder, private navCtrl: NavController,
    public alertCtrl: AlertController) { 
    
    this.myForm = this.createMyForm();

    this.slider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 1,
          image: 'assets/img/e1.png'
        },
        {
          id: 2,
          image: 'assets/img/e2.png'
        },
        {
          id: 3,
          image: 'assets/img/e3.png'
        },
        {
          id: 4,
          image: 'assets/img/e4.png'
        },
        {
          id: 5,
          image: 'assets/img/e5.png'
        },
        {
          id: 6,
          image: 'assets/img/e6.png'
        },
        {
          id: 7,
          image: 'assets/img/e7.png'
        },
        {
          id: 8,
          image: 'assets/img/e8.png'
        },
        {
          id: 9,
          image: 'assets/img/e9.png'
        },
        {
          id: 10,
          image: 'assets/img/e10.png'
        },
        {
          id: 11,
          image: 'assets/img/e1.png'
        },
        {
          id: 12,
          image: 'assets/img/e12.png'
        }
      ]
    };

    
  }

  printSome(some: string){

  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  slideNext(object, slideView){
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  slidePrev(object, slideView){
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  slideDidChange(object, slideView){
    this.checkIfNavDisabled(object, slideView);

    this.slideWithNav.getActiveIndex().then(index => {
      if(index == 13){
        index = (index - 12);
      }else if(index == 0){
        index = 12;
      }
      this.image = 'assets/img/e' + (index) + '.png'
      this.id = index;
   });
  }

  checkIfNavDisabled(object, slideView){
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView){
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView){
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  ionViewWillEnter(){
    this.lista.length = 0;
    this.arreglo.length = 0;
    this.id = 0;
    this.contador = 0;
    this.consumo = 0;

    this.i1 = 'assets/img/transparent.png';
    this.i2 = 'assets/img/transparent.png';
    this.i3 = 'assets/img/transparent.png';
    this.i4 = 'assets/img/transparent.png';
    this.i5 = 'assets/img/transparent.png';
    this.i6 = 'assets/img/transparent.png';
    this.i7 = 'assets/img/transparent.png';
    this.i8 = 'assets/img/transparent.png';
    this.i9 = 'assets/img/transparent.png';
    this.i10 = 'assets/img/transparent.png';
    this.i11 = 'assets/img/transparent.png';
    this.i12 = 'assets/img/transparent.png';
  }

  ngOnInit() {
  }

  verify(){
    if((this.myForm.value.cantidad == null) || (this.myForm.value.horas == null) || (this.myForm.value.dias == null)){
      this.verifyImage = false;
    }else{
      this.verifyImage = true;
    }
  }

  imageEvaluate(){
    var paso;
    for(paso = 0; paso < this.lista.length; paso++){
      if(this.id == this.lista[paso][4]){
        this.availableImage = false;
        break;
      }else{
        this.availableImage = true;
      }
    }
  }

  saveData(){
    
    this.verify();
    
    if(this.verifyImage){
      this.imageEvaluate();
      if(this.availableImage){
        this.contador = this.contador + 1; 
        this.arreglo = [[this.myForm.value.cantidad, this.myForm.value.horas, this.myForm.value.dias, this.image, this.id]];
        this.lista = this.lista.concat(this.arreglo);

        if(this.contador == 1){
          this.i1 = this.lista[this.contador - 1][3];
        }else if(this.contador == 2){
          this.i2 = this.lista[this.contador - 1][3];
        }else if(this.contador == 3){
          this.i3 = this.lista[this.contador - 1][3];
        }else if(this.contador == 4){
          this.i4 = this.lista[this.contador - 1][3];
        }else if(this.contador == 5){
          this.i5 = this.lista[this.contador - 1][3];
        }else if(this.contador == 6){
          this.i6 = this.lista[this.contador - 1][3];
        }else if(this.contador == 7){
          this.i7 = this.lista[this.contador - 1][3];
        }else if(this.contador == 8){
          this.i8 = this.lista[this.contador - 1][3];
        }else if(this.contador == 9){
          this.i9 = this.lista[this.contador - 1][3];
        }else if(this.contador == 10){
          this.i10 = this.lista[this.contador - 1][3];
        }else if(this.contador == 11){
          this.i11 = this.lista[this.contador - 1][3];
        }else if(this.contador == 12){
          this.i12 = this.lista[this.contador - 1][3];
        }else{
          this.contador = this.contador - 1;
        }
        this.myForm.reset();
      }
    }
  }

  clickImage(name: string){
    var paso;
    var a;
    if(name == 'i1'){
      a = this.i1;
    }else if(name == 'i2'){
      a = this.i2;
    }

    for(paso = 0; paso < this.lista.length; paso++){
      if(a == this.lista[paso][3]){
        break;
      }else{

      }
    }
  }

  removeLast(){
    var value = this.lista[this.lista.length - 1][4];

    this.lista.pop();
    this.contador = this.contador - 1;
    if(this.contador == 0){
      this.i1 = 'assets/img/transparent.png';
    }else if(this.contador == 1){
      this.i2 = 'assets/img/transparent.png';
    }else if(this.contador == 2){
      this.i3 = 'assets/img/transparent.png';
    }else if(this.contador == 3){
      this.i4 = 'assets/img/transparent.png';
    }else if(this.contador == 4){
      this.i5 = 'assets/img/transparent.png';
    }else if(this.contador == 5){
      this.i6 = 'assets/img/transparent.png';
    }else if(this.contador == 6){
      this.i7 = 'assets/img/transparent.png';
    }else if(this.contador == 7){
      this.i8 = 'assets/img/transparent.png';
    }else if(this.contador == 8){
      this.i9 = 'assets/img/transparent.png';
    }else if(this.contador == 9){
      this.i10 = 'assets/img/transparent.png';
    }else if(this.contador == 10){
      this.i11 = 'assets/img/transparent.png';
    }else if(this.contador == 11){
      this.i12 = 'assets/img/transparent.png';
    }
  }

  goTo(){
    if(this.lista.length == 0){
      return false;
    }else{
      return true;
    }
  }

  pushPage(){
    this.navCtrl.navigateForward('/calculate-enery/' + this.kwh); 
  }

  goToCalculate() {
    this.navCtrl.navigateRoot('/calculate-enery/');
    this.calculoConsumo();
    this.pushPage();
    
  }

  private calculoConsumo(){
    var a;
    for(a = 0; a < this.lista.length; a++){
      this.kwh += this.numConsumo[parseInt(this.lista[a][4]) - 1] * this.lista[a][0] * this.lista[a][1] * this.lista[a][2] / 30;
    }
  }

  kwh = 0;
  numConsumo = [100, 60, 800, 150, 400, 4.83, 6, 1500, 600, 1500, 100, 400]

  private createMyForm(){
    return this.formBuilder.group({
      cantidad: ['', DeviceValidator.isValid],
      horas: ['', HourValidator.isValid],
      dias: ['', DayValidator.isValid]
    });
  }

  async info() {
    const alert = await this.alertCtrl.create({
      header: 'Ayuda',
      message: '1. Seleccionas algún dispositivo y puedes cambiar estos con las fechas que se encuentran a la par de los dispositivos.<br>2. Llenas todos los campos para calcular tus datos.<br>3. Haces clic en el botón + para agregar tu dispositivo y lo podrás ver en la sección "Tus dispositivos seleccionados".<br>4. Presionas en "Calcular" para calcular tus resultados.',
      buttons: ['OK'],
      cssClass: 'popUp'
    });

    await alert.present();
  }
}
