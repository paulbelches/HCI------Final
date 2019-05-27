import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public idDoc: string;
  public email: string;
  public nombre: string;

  public magnitud : number;
  public id: string;
  public rango: number;
  public repeticionAlarm: number;
  public repeticionVibra: number;
  public volumen: number;

  public contador: number;
  public primera: boolean;

  public dates: any[];
  public paneles: any[];
  public datesEarth: any[];
  public earth: any[];
  
  constructor() {
    this.email = null;
    this.idDoc = null;
    this.nombre = null;
    this.primera = true;
    this.contador = 0;
    
    this.dates = [];
    this.paneles = [];
    this.datesEarth = [];
    this.earth = [];
    this.magnitud = 0;
    this.id="" ;
    this.rango = 0 ;
    this.repeticionAlarm= 0;
    this.repeticionVibra= 0;
    this.volumen= 0;
   }
}
