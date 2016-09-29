import { FormError } from '../states/patientFormState';
import { requiredValidation } from '../validations/requiredValidation';

class RequiredValidator {
  validateRequiredField(value: any): FormError {
    let formError = new FormError();
    formError.isValid = requiredValidation.isValid(value);

    if (!formError.isValid) {
      formError.errorMessage = "Mandatory field";
    }

    return formError;
  }
}

const requiredValidator = new RequiredValidator();

export {
  requiredValidator
}
