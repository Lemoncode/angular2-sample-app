import { Action, ActionCreator } from 'redux';
import { Patient } from '../model/patient';
import { patientAPI } from '../api/patientAPI';

export const ASSIGN_PATIENTS: string = "ASSIGN_PATIENTS";
export interface AssignPatientsAction extends Action {
  patients: Array<Patient>;
}

export const loadPatients = () => {
  return dispatcher => {
    patientAPI.getAllPatientsAsync().then((patients: Array<Patient>) => {
      dispatcher(assignPatients(patients));
    });
  }
};

const assignPatients: ActionCreator<AssignPatientsAction> = (patients: Array<Patient>) => ({
  type: ASSIGN_PATIENTS,
  patients
});
