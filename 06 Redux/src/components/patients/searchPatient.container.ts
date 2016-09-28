import { Component, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../../store';
import { AppState } from '../../reducers/';
import { loadSpecialties } from '../../actions/specialties/loadSpecialtiesAction';

@Component({
  selector: 'search-patient-container',
  template: `
  <div>
    <search-patient [specialties]="specialties"
      [searchPatient]="searchPatient.bind(this)">
    </search-patient>
  </div>
  `
})
class SearchPatientContainer {
  specialties: Array<string>;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
    store.dispatch(loadSpecialties());
  }

  searchPatient(event){
    event.preventDefault();
  }

  updateState() {
    let state: AppState = this.store.getState();
    this.specialties = state.specialties;
  }
}

export {
  SearchPatientContainer
}
