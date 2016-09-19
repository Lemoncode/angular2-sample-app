import { FormGroup, Validators } from '@angular/forms';
import { dniValidation } from '../validations/dniValidation';

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
      dniValidation.isDNI
    ]);
  }
}

export {
  PatientFormValidator
}
