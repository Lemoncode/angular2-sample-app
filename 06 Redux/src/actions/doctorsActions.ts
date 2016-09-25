import { Action, ActionCreator } from 'redux';
import { patientAPI } from '../api/patientAPI';

export const ASSIGN_DOCTORS: string = "ASSIGN_DOCTORS";
export interface AssignDoctorsAction extends Action {
  doctors: Array<string>;
}

export const loadDoctors = () => {
  return dispatcher => {
    patientAPI.getAllDoctorsAsync().then((doctors: Array<string>) => {
      dispatcher(assignDoctors(doctors));
    });
  }
}

const assignDoctors: ActionCreator<AssignDoctorsAction> = (doctors: Array<string>) => ({
  type: ASSIGN_DOCTORS,
  doctors
});
