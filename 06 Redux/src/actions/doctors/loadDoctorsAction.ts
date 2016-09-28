import { patientAPI } from '../../api/patientAPI';
import { assignDoctors } from './assignDoctorsAction';

export const loadDoctors = () => {
  return dispatcher => {
    patientAPI.getAllDoctorsAsync().then((doctors: Array<string>) => {
      dispatcher(assignDoctors(doctors));
    });
  }
}
