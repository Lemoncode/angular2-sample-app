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

export const savePatient = (patient: Patient) => {
  return dispatcher => {
    patientAPI.savePatient(patient);
  }
}

export const PATIENT_UI_INPUT: string = "PATIENT_UI_INPUT";
export interface PatientUIInputAction extends Action {
  fieldName: string;
  value: any;
}

export const updatePatientUI: ActionCreator<PatientUIInputAction> = (fieldName: string, value: any) => {
  return {
    type: PATIENT_UI_INPUT,
    fieldName,
    value
  }
}
