import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';
import { patientAPI } from '../../api/patientAPI';

//TODO: Change to normal action when we check errors
export const savePatient = (patient: Patient) => {
  return dispatcher => {
    patientAPI.savePatient(patient);
  }
}
