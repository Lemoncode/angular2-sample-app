import { Component, Inject } from '@angular/core';
import { Patient } from '../../model/patient';
import { Promise } from 'core-js/es6';
import { Store } from 'redux';
import { AppStore } from '../../store';
import { AppState } from '../../reducers/';
import { loadPatients } from '../../actions/patientsActions';

@Component({
  selector: 'patient-list-container',
  template: `
  <patient-list [patients]="patients">
  </patient-list>
  `
})
class PatientListContainer {
  patients: Array<Patient>;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.readState());
    store.dispatch(loadPatients());
  }

  readState() {
    let state: AppState = this.store.getState();
    this.patients = state.patients;
  }
}

export {
  PatientListContainer
}
