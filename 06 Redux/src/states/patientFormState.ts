import { Patient } from '../model/patient';

export class PatientFormState {
  patient: Patient;
  isValid: boolean;
  errors: PatientFormErrors;
}

export class PatientFormErrors {
  dni: FormError;
  name: FormError;
  date: FormError;
  time: FormError;
  specialty: FormError;
  doctor: FormError;
}

interface FormError {
  isValid: boolean;
  errorMessage: string;
}
