import { FormGroup, Validators } from '@angular/forms';
import { dniValidator } from './dniValidator';

class PatientFormValidator {
  constructor(private patientForm: FormGroup) {

  }

  setValidators() {
    this.setDNIValidators();
  }

  private setDNIValidators() {
    let dniControl = this.patientForm.controls['dni'];

    dniControl.setValidators([
      Validators.required,
      dniValidator.hasValidFormat,
      dniValidator.isValid
    ]);
  }
}

export {
  PatientFormValidator
}
