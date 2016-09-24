import { Promise } from 'core-js/es6';
import { Patient } from '../model/patient';
import { patientsMockData, specialtiesMockData } from './mockData';

class PatientAPI {
  getAllPatientsAsync(): Promise<Array<Patient>> {
    let patientsPromise = new Promise((resolve, reject) => {
      resolve(patientsMockData);
    });

    return patientsPromise;
  };

  getAllSpecialtiesAsync(): Promise<Array<string>> {
    let specialtiesPromise = new Promise((resolve, reject) => {
      resolve(specialtiesMockData);
    });

    return specialtiesPromise;
  }
}


export {
  PatientAPI
}
