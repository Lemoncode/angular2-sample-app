import { Patient } from '../model/patient';
import { PatientFormState, PatientFormErrors, FormError } from '../states/patientFormState';
import { dniValidation } from '../validations/dniValidation';
import { requiredValidation } from '../validations/requiredValidation';

class PatientFormValidator {

  validateField(field: string, value: any): FormError {
    switch(field) {
      case "dni":
        return this.validateDNI(value);

      default:
        return this.validateRequiredField(value);
    }
  }

  validatePatient(patient: Patient): PatientFormState {
    let patientFormState = new PatientFormState();
    patientFormState.patient = patient;
    patientFormState.errors.dni = this.validateDNI(patient.dni);
    patientFormState.errors.name = this.validateRequiredField(patient.name);
    patientFormState.errors.date = this.validateRequiredField(patient.date);
    patientFormState.errors.time = this.validateRequiredField(patient.time);
    patientFormState.errors.specialty = this.validateRequiredField(patient.specialty);
    patientFormState.errors.doctor = this.validateRequiredField(patient.doctor);
    patientFormState.isValid = this.isFormValid(patientFormState.errors);

    return patientFormState;
  }

  private validateDNI(dni: string): FormError {
    let formError = new FormError();
    formError.isValid = true;

    switch (false) {
      case requiredValidation.isValid(dni):
        formError.isValid = false;
        formError.errorMessage = "Mandatory field";
        break;

      case dniValidation.hasValidFormat(dni):
        formError.isValid = false;
        formError.errorMessage = "Invalid format";
        break;

      case dniValidation.isValid(dni):
        formError.isValid = false;
        formError.errorMessage = "Invalid DNI";
        break;
    }

    return formError;
  }

  private validateRequiredField(value: any): FormError {
    let formError = new FormError();
    formError.isValid = requiredValidation.isValid(value);

    if (!formError.isValid) {
      formError.errorMessage = "Mandatory field";
    }

    return formError;
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
