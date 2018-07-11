import { AbstractControl } from "@angular/forms";
import { PaysService } from "../services/pays.service";

export class AsyncUniqueValidator { static createValidator(paysService: PaysService) {
    return (control: AbstractControl) => {
      return paysService.isExiste(control.value).map(res => {
          
          console.log(res);
        return !res ? null : { isExiste: true };
      });
    };
  }
}