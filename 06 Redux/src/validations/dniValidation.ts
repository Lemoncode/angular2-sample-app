let hasValidFormat = (value: string): boolean => {
  const dniRegex = /^[0-9]{8}[a-z, A-Z]$/;

  return dniRegex.test(value);
}

let isValidDNI = (value: string): boolean => {
  let dniNumber: number = parseInt(value);
  let validLetter: string = getValidLetterByDNINumber(dniNumber);
  let currentLetter = value.charAt(8).toUpperCase();

  return currentLetter === validLetter;
};

let getValidLetterByDNINumber = (dniNumber: number) : string => {
  let letterIndex = dniNumber % 23;
  let validLetters = 'TRWAGMYFPDXBNJZSQVHLCKET';

  return validLetters.charAt(letterIndex)
};

export {
  hasValidFormat,
  isValidDNI
}
