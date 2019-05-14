import { FormControl } from '@angular/forms';

export class DeviceValidator{
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
        
        if(control.value > 50){
            return{
                "Ingrese un dato real.": true
            };
        }
    }
}