import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';

export const ASSIGN_PATIENT: string = "ASSIGN_PATIENT";
export interface AssignPatientAction extends Action {
  patient: Patient;
}

export const assignPatient: ActionCreator<AssignPatientAction> =
(patient: Patient) => ({
  type: ASSIGN_PATIENT,
  patient
});
