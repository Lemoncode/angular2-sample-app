import { Action, ActionCreator } from 'redux';
import { Patient } from '../model/patient';
import { patientAPI } from '../api/patientAPI';

export const ASSIGN_PATIENT: string = "ASSIGN_PATIENT";
export interface AssignPatientAction extends Action {
  patient: Patient;
}

export const loadPatientById = (id: number) => {
  return dispatcher => {
    if (id > 0) {
      patientAPI.getPatientByIdAsync(id).then((patient: Patient) => {
        dispatcher(assignPatient(patient));
      });
    } else {
      const patient = new Patient();
      dispatcher(assignPatient(patient));
    }
  }
};

const assignPatient: ActionCreator<AssignPatientAction> = (patient: Patient) => ({
  type: ASSIGN_PATIENT,
  patient
});
