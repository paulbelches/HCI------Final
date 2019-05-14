import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalService } from '../../services/global.service';
import { persona, PersonasService } from '../../services/persona.service';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { calculadora, CalculadoraEnergeticaService } from 'src/app/services/calculadora-energetica.service';
import { Huella, HuellaCarbonoService } from 'src/app/services/huella-carbono.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit {

  @ViewChild('earth') earth;
  lineChart: any;

  @ViewChild('panel') panel;
  lineChart2: any;

  constructor(public global: GlobalService, 
    private PersonasService: PersonasService,
    private CalculadoraEnergeticaService: CalculadoraEnergeticaService,
    private HuellaCarbonoService: HuellaCarbonoService) {   }

  ngOnInit() {
  }

  ionViewWillEnter(){
  }

  ionViewDidEnter(){

    this.graphic();
    this.graphic2();
  }

  
  private graphic(){
    this.lineChart = new Chart(this.earth.nativeElement, {
      type: 'line',
      data: {
        labels: this.global.datesEarth,
        datasets: [
          {
            label: "Cantidad de planetas Tierra",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "rgb(0, 0, 0)",
            pointBorderWidth: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.global.earth,
          }
        ]
      },
      options:{
        scales: {
          yAxes: [{
            display: true,
            ticks: {
                suggestedMax: 5,
                min: 0,
                stepSize: 1
            }
          }]
        }
      }
    });
  }

  private graphic2(){
    this.lineChart2 = new Chart(this.panel.nativeElement, {
      type: 'line',
      data: {
        labels: this.global.dates,
        datasets: [
          {
            label: "Cantidad de páneles solares",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "rgb(0, 0, 0)",
            pointBorderWidth: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.global.paneles,
          }
        ]
      },
      options:{
        scales: {
          yAxes: [{
            display: true,
            ticks: {
                suggestedMax: 20,
                min: 0,
                stepSize: 2
            }
          }]
        }
      }
    });
  }
}
