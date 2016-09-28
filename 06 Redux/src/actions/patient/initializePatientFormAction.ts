import { Action, ActionCreator } from 'redux';

export const INITIALIZE_PATIENT_FORM: string = "INITIALIZE_PATIENT_FORM";

export const initializePatientForm: ActionCreator<Action> = () => ({
    type: INITIALIZE_PATIENT_FORM
})
