import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientAPI } from '../../api/patientAPI';
import { Patient } from '../../model/patient';
import { Store } from 'redux';
import { AppStore } from '../../store';
import { AppState } from '../../reducers/';
import { loadSpecialties } from '../../actions/specialtiesActions';
import { loadDoctors } from '../../actions/doctorsActions';
import { loadPatientById, savePatient } from '../../actions/patientActions';

@Component({
  selector: 'patient-form-container',
  template: `
  <div>
    <patient-form [patient]="patient"
      [specialties]="specialties"
      [doctors]="doctors"
      [savePatient]="savePatient.bind(this)"
      [navigateBack]="navigateBack.bind(this)">
    </patient-form>
  </div>
  `
})
class PatientFormContainer {
  specialties: Array<string>;
  doctors: Array<string>;
  patient: Patient;
  private patientId: number;

  constructor(private route: ActivatedRoute, private router: Router, private patientAPI : PatientAPI,
  @Inject(AppStore) private store: Store<AppState>) {
    this.loadPatientId();

    store.subscribe(() => this.updateState());
    store.dispatch(loadSpecialties());
    store.dispatch(loadDoctors());
    store.dispatch(loadPatientById(this.patientId));
  }

  private loadPatientId() {
    this.route.params.subscribe(params => {
      this.patientId = parseInt(params['id']);
    });
  }

  savePatient(event: any, patient: Patient) {
    this.store.dispatch(savePatient(patient));
    this.navigateBack(event);
  }

  navigateBack(event: any) {
    event.preventDefault();
    this.router.navigate(['/patients']);
  }

  updateState() {
    let state: AppState = this.store.getState();
    this.specialties = state.specialties;
    this.doctors = state.doctors;
    this.patient = state.patient;
  }
}

export {
  PatientFormContainer
}
