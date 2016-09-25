import { Reducer } from 'redux';
import { LOAD_SPECIALTIES, LoadSpecialtiesAction } from '../actions/specialtiesActions';

export const specialtiesReducer: Reducer<Array<string>> =
(state: Array<string> = [], action: LoadSpecialtiesAction): Array<string> => {
  switch(action.type) {
    case LOAD_SPECIALTIES:
      return [...action.specialties];

    default:
      return state;
  }
};
