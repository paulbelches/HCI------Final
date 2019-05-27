import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public idDoc: string;
  public email: string;
  public nombre: string;

  public id: string;
  public rango: number;
  public melodia: number;
  public repeticionAlarm: boolean;
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
    this.id="" ;
    this.melodia = 0;
    this.rango = 0 ;
    this.repeticionAlarm= false;
    this.volumen= 0;
   }
}
