import { Reducer, Action } from 'redux';
import { Patient } from '../model/patient';

export interface PatientsState {
  patients: Array<Patient>;
}

const initialState: PatientsState = {
  patients: []
};

export const patientsReducer: Reducer<PatientsState> =
(state: PatientsState = initialState, action: Action): PatientsState => {
  switch(action.type) {
    default:
      return state;
  }
};
