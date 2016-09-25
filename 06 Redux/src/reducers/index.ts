import { Reducer, combineReducers } from 'redux';
import { Patient } from '../model/patient';
import { patientsReducer } from './patientsReducer';

export interface AppState {
  patients: Array<Patient>;
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
  patients: patientsReducer
});
