import { Patient } from '../model/patient';
import { PatientFormState } from './patientFormState';

export interface AppState {
  patients: Array<Patient>;
  specialties: Array<string>;
  doctors: Array<string>;
  patientForm: PatientFormState;
}
