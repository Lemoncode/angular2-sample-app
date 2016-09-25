import { Reducer, combineReducers } from 'redux';
import { PatientsState } from './patientsReducer';

export interface AppState {
  patients: PatientsState;
}

export const reducers: Reducer<AppState> = combineReducers<AppState>({
  patients: 
});
