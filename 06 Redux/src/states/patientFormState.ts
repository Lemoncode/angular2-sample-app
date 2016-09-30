import { Patient } from '../model/patient';

export class PatientFormState {
  patient: Patient;
  isValid: boolean;
  errors: PatientFormErrors;
  isSaveCompleted: boolean;

  constructor() {
    this.patient = new Patient();
    this.isValid = true;
    this.errors = new PatientFormErrors();
    this.isSaveCompleted = false;
  }
}

export class PatientFormErrors {
  dni: FormError;
  name: FormError;
  date: FormError;
  time: FormError;
  specialty: FormError;
  doctor: FormError;

  constructor () {
    this.dni = new FormError();
    this.name = new FormError();
    this.date = new FormError();
    this.time = new FormError();
    this.specialty = new FormError();
    this.doctor = new FormError();
  }
}

export class FormError {
  isValid: boolean;
  errorMessage: string;

  constructor() {
    this.isValid = true;
    this.errorMessage = "";
  }
}
