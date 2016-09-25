import { Reducer } from 'redux';
import { Patient } from '../model/patient';
import { ASSIGN_PATIENTS, AssignPatientsAction } from '../actions/patientsActions';

export const patientsReducer: Reducer<Array<Patient>> =
(state: Array<Patient> = [], action: AssignPatientsAction): Array<Patient> => {
  switch(action.type) {
    case ASSIGN_PATIENTS:
      return [...action.patients];

    default:
      return state;
  }
};
