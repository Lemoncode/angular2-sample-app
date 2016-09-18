import { Promise } from 'core-js/es6';
import { Patient } from '../model/patient';
import { patientsMockData, specialtiesMockData, doctorsMockData } from './mockData';

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
  };

  getAllDoctorsAsync(): Promise<Array<string>> {
    let doctorsPromise = new Promise((resolve, reject) => {
      resolve(doctorsMockData);
    });

    return doctorsPromise;
  };

  getPatientByIdAsync(id: number): Promise<Patient> {
    let patientPromise = new Promise((resolve, reject) => {
      let patient = patientsMockData.filter((patient: Patient) => {
        return patient.id === id;
      });

      resolve(patient);
    });

    return patientPromise;
  }
}

const patientAPI = new PatientAPI();

export {
  patientAPI
}
