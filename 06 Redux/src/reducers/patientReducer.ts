import { Reducer, Action } from 'redux';
import { Patient } from '../model/patient';
import { PatientFormState, PatientFormErrors } from '../states/patientFormState';
import { ASSIGN_PATIENT, AssignPatientAction } from '../actions/patient/assignPatientAction';
import { PATIENT_UI_INPUT, PatientUIInputAction } from '../actions/patient/updatePatientUIAction';

export const patientReducer: Reducer<PatientFormState> =
(state: PatientFormState = new PatientFormState(), action: Action): PatientFormState => {
  switch(action.type) {
    case ASSIGN_PATIENT:
      return assignPatient(state, action as AssignPatientAction);

    case PATIENT_UI_INPUT:
      return patientUIInput(state, action as PatientUIInputAction);

    default:
      return state;
  }
};

const assignPatient = (state: PatientFormState, action: AssignPatientAction) => {
  return Object.assign({}, state, {
    patient: action.patient
  });
}

const patientUIInput = (state: PatientFormState, action: PatientUIInputAction) => {
  let patient = Object.assign({}, state.patient, {
    [action.fieldName]: action.value
  });

  let errors = Object.assign({}, state.errors, {
    [action.fieldName]: action.formError
  });

  return Object.assign({}, state, {
    patient,
    errors,
    isValid: isFormValid(errors)
  });
}

const isFormValid = (errors: PatientFormErrors): boolean => {
  return Object.keys(errors).every((key) => {
    return errors[key].isValid;
  });
}
