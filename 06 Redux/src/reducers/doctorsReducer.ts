import { Reducer } from 'redux';
import { ASSIGN_DOCTORS, AssignDoctorsAction } from '../actions/doctorsActions';

export const doctorsReducer: Reducer<Array<string>> =
(state: Array<string> = [], action: AssignDoctorsAction): Array<string> => {
  switch(action.type) {
    case ASSIGN_DOCTORS:
      return [...action.doctors];

    default:
      return state;
  }
};
