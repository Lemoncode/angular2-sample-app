import { Action, ActionCreator } from 'redux';
import { patientAPI } from '../api/patientAPI';

export const ASSIGN_SPECIALTIES: string = "ASSIGN_SPECIALTIES";
export interface AssignSpecialtiesAction extends Action {
  specialties: Array<string>;
}

export const loadSpecialties = () => {
  return dispatcher => {
    patientAPI.getAllSpecialtiesAsync().then((specialties: Array<string>) => {
      dispatcher(assignSpecialties(specialties));
    });
  }
}

const assignSpecialties: ActionCreator<AssignSpecialtiesAction> = (specialties: Array<string>) => ({
  type: ASSIGN_SPECIALTIES,
  specialties
});
