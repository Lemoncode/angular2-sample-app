import { Action, ActionCreator } from 'redux';
import { Patient } from '../model/patient';

export const LOAD_PATIENTS: string = "LOAD_PATIENTS";
export interface LoadPatientsAction extends Action {
  patients: Array<Patient>;
}

//TODO: Use async action to load patients from API.
export const loadPatients: ActionCreator<LoadPatientsAction> = () => ({
  type: LOAD_PATIENTS,
  patients: [
    { id: 1, dni: '50614475P', name: "Daniel Sanchez", specialty: "Traumatología",
      doctor: "Karl J. Linville", date: "2019-09-19", time: "08:30" }
  ]
});
