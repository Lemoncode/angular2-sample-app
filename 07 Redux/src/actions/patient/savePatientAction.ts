import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';
import { PatientFormState } from '../../states/patientFormState';
import { patientAPI } from '../../api/patientAPI';
import { patientFormValidator } from '../../validators/patientFormValidator';

export const SAVE_PATIENT: string = "SAVE_PATIENT";
export interface SavePatientAction extends Action {
  patientFormState: PatientFormState;
}
export const savePatient: ActionCreator<SavePatientAction> =
(patient: Patient) => {
  let patientFormState = patientFormValidator.validatePatient(patient);

  if (patientFormState.isValid) {
    patientAPI.savePatient(patient);
    patientFormState.isSaveCompleted = true;
  }

  return {
    type: SAVE_PATIENT,
    patientFormState
  }
}
