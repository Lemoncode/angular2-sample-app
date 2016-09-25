import { Reducer, combineReducers } from 'redux';
import { Patient } from '../model/patient';
import { patientsReducer } from './patientsReducer';
import { specialtiesReducer } from './specialtiesReducer';
import { doctorsReducer } from './doctorsReducer';

export interface AppState {
  patients: Array<Patient>;
  specialties: Array<string>;
  doctors: Array<string>;
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
  patients: patientsReducer,
  specialties: specialtiesReducer,
  doctors: doctorsReducer
});
