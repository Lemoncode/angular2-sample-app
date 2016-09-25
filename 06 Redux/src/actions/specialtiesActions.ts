import { Action, ActionCreator } from 'redux';

export const LOAD_SPECIALTIES: string = "LOAD_SPECIALTIES";
export interface LoadSpecialtiesAction extends Action {
  specialties: Array<string>;
}

//TODO: Use async action to load specialties from API.
export const loadSpecialties: ActionCreator<LoadSpecialtiesAction> = () => ({
  type: LOAD_SPECIALTIES,
  specialties: [
    "Traumatología"
  ]
});
