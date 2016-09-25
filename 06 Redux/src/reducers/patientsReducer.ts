import { Reducer } from 'redux';
import { Patient } from '../model/patient';
import { LOAD_PATIENTS, LoadPatientsAction } from '../actions/patientsActions';

export const patientsReducer: Reducer<Array<Patient>> =
(state: Array<Patient> = [], action: LoadPatientsAction): Array<Patient> => {
  switch(action.type) {
    case LOAD_PATIENTS:
      return [...action.patients];

    default:
      return state;
  }
};
