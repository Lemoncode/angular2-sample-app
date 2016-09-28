import { Reducer, Action } from 'redux';
import { Patient } from '../model/patient';
import {
  ASSIGN_PATIENT, AssignPatientAction,
  PATIENT_UI_INPUT, PatientUIInputAction } from '../actions/patientActions';

export const patientReducer: Reducer<Patient> =
(state: Patient = new Patient(), action: Action): Patient => {
  switch(action.type) {
    case ASSIGN_PATIENT:
      return assignPatient(state, action as AssignPatientAction);

    case PATIENT_UI_INPUT:
      return patientUIInput(state, action as PatientUIInputAction);

    default:
      return state;
  }
};

const assignPatient = (state: Patient, action: AssignPatientAction) => {
  return Object.assign({}, state, action.patient);
}

const patientUIInput = (state: Patient, action: PatientUIInputAction) => {
  return Object.assign({}, state, {
    [action.fieldName]: action.value
  });
}
