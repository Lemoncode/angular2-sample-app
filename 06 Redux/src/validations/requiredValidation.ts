class RequiredValidation {
  isValid(value): boolean {
    return value !== null &&
      value !== undefined &&
      value !== ""
  }
}

const requiredValidation = new RequiredValidation();

export {
  requiredValidation
}
