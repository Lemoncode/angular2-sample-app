import { Action, ActionCreator } from 'redux';

export const PATIENT_UI_INPUT: string = "PATIENT_UI_INPUT";
export interface PatientUIInputAction extends Action {
  fieldName: string;
  value: any;
}

export const updatePatientUI: ActionCreator<PatientUIInputAction> =
(fieldName: string, value: any) => ({
    type: PATIENT_UI_INPUT,
    fieldName,
    value
})
