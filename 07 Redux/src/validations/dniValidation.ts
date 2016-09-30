class DNIValidation {
  hasValidFormat = (value: string): boolean => {
    const dniRegex = /^[0-9]{8}[a-z, A-Z]$/;

    return dniRegex.test(value);
  }

  isValid = (value: string): boolean => {
    let dniNumber: number = parseInt(value);
    let validLetter: string = this.getValidLetterByDNINumber(dniNumber);
    let currentLetter = value.charAt(8).toUpperCase();

    return currentLetter === validLetter;
  };

  private getValidLetterByDNINumber = (dniNumber: number) : string => {
    let letterIndex = dniNumber % 23;
    let validLetters = 'TRWAGMYFPDXBNJZSQVHLCKET';

    return validLetters.charAt(letterIndex)
  };
}

const dniValidation = new DNIValidation();

export {
  dniValidation
}
