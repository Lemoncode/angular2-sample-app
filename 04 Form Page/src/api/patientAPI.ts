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
      let patient = patientsMockData.find((patient: Patient) => {
        return patient.id === id;
      });

      resolve(patient);
    });

    return patientPromise;
  };

  savePatient(currentPatient: Patient): void {
    let patient = patientsMockData.find((patient: Patient) => {
      return patient.id === currentPatient.id;
    });

    if (patient) {
        let patientIndex = patientsMockData.indexOf(patient);
        patientsMockData.splice(patientIndex, 1, currentPatient);
    } else {
      let lastId = patientsMockData[patientsMockData.length -1].id;
      currentPatient.id = lastId + 1;

      patientsMockData.push(currentPatient);
    }

    patient = currentPatient;
  }
}


export {
  PatientAPI
}
