import { Reducer } from 'redux';
import { ASSIGN_SPECIALTIES, AssignSpecialtiesAction } from '../actions/specialtiesActions';

export const specialtiesReducer: Reducer<Array<string>> =
(state: Array<string> = [], action: AssignSpecialtiesAction): Array<string> => {
  switch(action.type) {
    case ASSIGN_SPECIALTIES:
      return [...action.specialties];

    default:
      return state;
  }
};
