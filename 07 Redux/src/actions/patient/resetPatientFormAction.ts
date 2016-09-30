import { Action, ActionCreator } from 'redux';

export const RESET_PATIENT_FORM: string = "RESET_PATIENT_FORM";

export const resetPatientForm: ActionCreator<Action> = () => ({
  type: RESET_PATIENT_FORM
});
