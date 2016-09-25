import { Reducer, combineReducers } from 'redux';
import { Patient } from '../model/patient';
import { patientsReducer } from './patientsReducer';
import { specialtiesReducer } from './specialtiesReducer';

export interface AppState {
  patients: Array<Patient>;
  specialties: Array<string>;
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
  patients: patientsReducer,
  specialties: specialtiesReducer
});
