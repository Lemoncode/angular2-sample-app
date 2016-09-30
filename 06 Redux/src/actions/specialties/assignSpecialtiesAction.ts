import { Action, ActionCreator } from 'redux';

export const ASSIGN_SPECIALTIES: string = "ASSIGN_SPECIALTIES";
export interface AssignSpecialtiesAction extends Action {
  specialties: Array<string>;
}

export const assignSpecialties: ActionCreator<AssignSpecialtiesAction> =
(specialties: Array<string>) => ({
    type: ASSIGN_SPECIALTIES,
    specialties
  });
