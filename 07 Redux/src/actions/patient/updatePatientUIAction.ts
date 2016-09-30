import { Action, ActionCreator } from 'redux';
import { FormError } from '../../states/patientFormState';
import { patientFormValidator } from '../../validators/patientFormValidator';

export const PATIENT_UI_INPUT: string = "PATIENT_UI_INPUT";
export interface PatientUIInputAction extends Action {
  fieldName: string;
  value: any;
  formError: FormError;
}

export const updatePatientUI: ActionCreator<PatientUIInputAction> =
(fieldName: string, value: any) => {
  let formError: FormError = patientFormValidator.validateField(fieldName, value);

  return {
      type: PATIENT_UI_INPUT,
      fieldName,
      value,
      formError
  }
}
