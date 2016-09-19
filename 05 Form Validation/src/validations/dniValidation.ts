import { FormControl } from '@angular/forms';

class DNIValidation {
  isDNI(dniControl: FormControl): any {
    return hasValidFormat(dniControl.value) && isValidDNI(dniControl.value) ?
      null :
      {
        "isDNI": {
          valid: false
        }
      }
  }
}
//Problems with this
let hasValidFormat = (value: string): boolean => {
  const dniRegex = /^[0-9]{8}[a-z, A-Z]$/;

  return dniRegex.test(value);
}

let isValidDNI = (value: string): boolean => {
  let validLetterMap = 'TRWAGMYFPDXBNJZSQVHLCKET';
  let dniNumber: number = parseInt(value);
  let letterIndex = dniNumber % 23;
  let validLetter = validLetterMap.charAt(letterIndex);

  let currentLetter = value.charAt(8).toUpperCase();

  return currentLetter === validLetter;
};

const dniValidation = new DNIValidation();

export {
  dniValidation
}
