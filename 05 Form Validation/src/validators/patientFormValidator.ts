import { FormGroup, Validators } from '@angular/forms';
import { dniValidator } from './dniValidator';

class PatientFormValidator {
  constructor(private patientForm: FormGroup) {

  }

  setValidators() {
    this.setDNIValidators();
    this.setNameValidators();
  }

  private setDNIValidators() {
    let dniFormControl = this.patientForm.controls['dni'];

    dniFormControl.setValidators([
      Validators.required,
      dniValidator.hasValidFormat,
      dniValidator.isValid
    ]);
  }

  private setNameValidators() {
    let nameFormControl = this.patientForm.controls['name'];

    nameFormControl.setValidators([
      Validators.required
    ]);
  }
}

export {
  PatientFormValidator
}
