import { Patient } from '../model/patient';
import { PatientFormState, PatientFormErrors, FormError } from '../states/patientFormState';
import { dniValidator } from './dniValidator';
import { requiredValidator } from './requiredValidator';

class PatientFormValidator {

  validateField(field: string, value: any): FormError {
    switch(field) {
      case "dni":
        return dniValidator.validateDNI(value);

      default:
        return requiredValidator.validateRequiredField(value);
    }
  }

  validatePatient(patient: Patient): PatientFormState {
    let patientFormState = new PatientFormState();
    patientFormState.patient = patient;

    patientFormState.errors.dni = dniValidator.validateDNI(patient.dni);
    patientFormState.errors.name = requiredValidator.validateRequiredField(patient.name);
    patientFormState.errors.date = requiredValidator.validateRequiredField(patient.date);
    patientFormState.errors.time = requiredValidator.validateRequiredField(patient.time);
    patientFormState.errors.specialty = requiredValidator.validateRequiredField(patient.specialty);
    patientFormState.errors.doctor = requiredValidator.validateRequiredField(patient.doctor);
    
    patientFormState.isValid = this.isFormValid(patientFormState.errors);

    return patientFormState;
  }

  private isFormValid = (errors: PatientFormErrors): boolean => {
    return Object.keys(errors).every((key) => {
      return errors[key].isValid;
    });
  }
}

const patientFormValidator = new PatientFormValidator();

export {
  patientFormValidator
}
