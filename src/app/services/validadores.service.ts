import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() {}

  NoHerrera(control: FormControl): {[s: string]: boolean} {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        NoHerrera: true
      };
    }
    return null;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  // validor asincrono
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>  {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'boriss2') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

}

interface ErrorValidate {
  [s: string]: boolean;
}
