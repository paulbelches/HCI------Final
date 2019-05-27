import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public idDoc: string;
  public email: string;
  public nombre: string;
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
    this.earth = []
   }
}
