import { Reducer } from 'redux';
import { Patient } from '../model/patient';
import { ASSIGN_PATIENT, AssignPatientAction } from '../actions/patientActions';

export const patientReducer: Reducer<Patient> =
(state: Patient = new Patient(), action: AssignPatientAction): Patient => {
  switch(action.type) {
    case ASSIGN_PATIENT:
      return Object.assign({}, state, action.patient);

    default:
      return state;
  }
};
