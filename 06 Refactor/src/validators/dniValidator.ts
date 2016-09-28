import { FormControl } from '@angular/forms';
import { hasValidFormat, isValidDNI } from '../validations/dniValidation';

class DNIValidator {
  hasValidFormat(dniFormControl: FormControl): any {
    return hasValidFormat(dniFormControl.value) ?
      null :
      {
        "dni.hasValidFormat": {
          valid: false
        }
      }
  }

  isValid(dniFormControl: FormControl) {
    return isValidDNI(dniFormControl.value) ?
      null :
      {
        "dni.isValid": {
          valid: false
        }
      }
  }
}

const dniValidator = new DNIValidator();

export {
  dniValidator
}
