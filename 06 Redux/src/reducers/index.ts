import { Reducer, combineReducers } from 'redux';
import { AppState } from '../states/appState';
import { patientsReducer } from './patientsReducer';
import { specialtiesReducer } from './specialtiesReducer';
import { doctorsReducer } from './doctorsReducer';
import { patientReducer } from './patientReducer';


export const reducers: Reducer<AppState> = combineReducers<AppState>({
  patients: patientsReducer,
  specialties: specialtiesReducer,
  doctors: doctorsReducer,
  patient: patientReducer
});
