import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarma',
  templateUrl: './alarma.page.html',
  styleUrls: ['./alarma.page.scss'],
})
export class AlarmaPage implements OnInit 
{
  passedVar=null;
  constructor() 
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
  }

}
