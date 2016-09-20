import { FormGroup, Validators } from '@angular/forms';
import { dniValidator } from './dniValidator';

class PatientFormValidator {
  constructor(private patientForm: FormGroup) {

  }

  setValidators() {
    this.setDNIValidators();
    this.setNameValidators();
    this.setDateValidators();
    this.setTimeValidators();
    this.setSpecialtyValidators();
    this.setDoctorValidators();
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

  private setDateValidators() {
    let dateFormControl = this.patientForm.controls['date'];

    dateFormControl.setValidators([
      Validators.required
    ]);
  }

  private setTimeValidators() {
    let timeFormControl = this.patientForm.controls['time'];

    timeFormControl.setValidators([
      Validators.required
    ]);
  }

  private setSpecialtyValidators() {
    let specialtyFormControl = this.patientForm.controls['specialty'];

    specialtyFormControl.setValidators([
      Validators.required
    ]);
  }

  private setDoctorValidators() {
    let doctorFormControl = this.patientForm.controls['doctor'];

    doctorFormControl.setValidators([
      Validators.required
    ]);
  }
}

export {
  PatientFormValidator
}
