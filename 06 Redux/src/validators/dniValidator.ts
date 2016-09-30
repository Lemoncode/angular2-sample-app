import {FormError } from '../states/patientFormState';
import { dniValidation } from '../validations/dniValidation';
import { requiredValidation } from '../validations/requiredValidation';

class DNIValidator {
  validateDNI(dni: string): FormError {
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
}

const dniValidator = new DNIValidator();

export {
  dniValidator
}
