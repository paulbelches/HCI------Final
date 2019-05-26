import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  passedVar=null;
  constructor(private activateRoute: ActivatedRoute) 
  {
    this.timerTick();
    
    
    

   }

   timerTick()
   {
     
    setTimeout( () => {
      this.passedVar+=0.1
        this.timerTick();
    }, 1000);

   }

   

  ngOnInit() {
    this.latOri = this.activateRoute.snapshot.paramMap.get('latOri');
    this.lngOri = this.activateRoute.snapshot.paramMap.get('lngOri');
    this.latDest = this.activateRoute.snapshot.paramMap.get('latDest');
    this.lngDest = this.activateRoute.snapshot.paramMap.get('lngDest');
    this.lugar = this.activateRoute.snapshot.paramMap.get('lugar');

    console.log(this.latOri);
    console.log(this.lngOri);
    console.log(this.latDest);
    console.log(this.lngDest);
    console.log(this.lugar);

  }

}
