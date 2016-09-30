import { Patient } from '../../model/patient';
import { patientAPI } from '../../api/patientAPI';
import { assignPatient } from './assignPatientAction';

export const loadPatientById = (id: number) => {
  return dispatcher => {
    if (id > 0) {
      patientAPI.getPatientByIdAsync(id).then((patient: Patient) => {
        dispatcher(assignPatient(patient));
      });
    } else {
      const patient = new Patient();
      dispatcher(assignPatient(patient));
    }
  }
};
