import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';
import { patientAPI } from '../../api/patientAPI';

export const savePatient = (patient: Patient) => {
  return dispatcher => {
    patientAPI.savePatient(patient);
  }
}
