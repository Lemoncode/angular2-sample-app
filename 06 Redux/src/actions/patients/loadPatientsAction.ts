import { patientAPI } from '../../api/patientAPI';
import { Patient } from '../../model/patient';
import { assignPatients } from './assignPatientsAction';

export const loadPatients = () => {
  return dispatcher => {
    patientAPI.getAllPatientsAsync().then((patients: Array<Patient>) => {
      dispatcher(assignPatients(patients));
    });
  }
};
