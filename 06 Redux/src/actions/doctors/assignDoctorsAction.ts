import { Action, ActionCreator } from 'redux';

export const ASSIGN_DOCTORS: string = "ASSIGN_DOCTORS";
export interface AssignDoctorsAction extends Action {
  doctors: Array<string>;
}

export const assignDoctors: ActionCreator<AssignDoctorsAction> =
(doctors: Array<string>) => ({
  type: ASSIGN_DOCTORS,
  doctors
});
