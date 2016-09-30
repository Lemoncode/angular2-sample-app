import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';

export const ASSIGN_PATIENTS: string = "ASSIGN_PATIENTS";
export interface AssignPatientsAction extends Action {
  patients: Array<Patient>;
}

export const assignPatients: ActionCreator<AssignPatientsAction> =
(patients: Array<Patient>) => ({
    type: ASSIGN_PATIENTS,
    patients
  });
