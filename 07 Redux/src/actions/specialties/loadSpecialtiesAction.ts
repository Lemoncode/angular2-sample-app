import { patientAPI } from '../../api/patientAPI';
import { assignSpecialties } from './assignSpecialtiesAction';

export const loadSpecialties = () => {
  return dispatcher => {
    patientAPI.getAllSpecialtiesAsync().then((specialties: Array<string>) => {
      dispatcher(assignSpecialties(specialties));
    });
  }
}
