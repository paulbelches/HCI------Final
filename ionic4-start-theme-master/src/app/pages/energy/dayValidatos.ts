import { FormControl } from '@angular/forms';

export class DayValidator {
    static isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return{
                "No es un numero.": true
            };
        }

        if(control.value < 0){
            return{
                "Debe ser un valor positivo.": true
            };
        }

        if(control.value == 0){
            return{
                "No debe ser 0.": true
            };
        }
        
        if(control.value > 31){
            return{
                "Ingrese un dato real.": true
            };
        }
    }
}