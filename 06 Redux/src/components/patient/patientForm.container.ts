import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../model/patient';
import { Store } from 'redux';
import { AppStore } from '../../store';
import { AppState } from '../../states/appState';
import { PatientFormState } from '../../states/patientFormState';
import { loadSpecialties } from '../../actions/specialties/loadSpecialtiesAction';
import { loadDoctors } from '../../actions/doctors/loadDoctorsAction';
import { loadPatientById } from '../../actions/patient/loadPatientAction';
import { savePatient } from '../../actions/patient/savePatientAction';
import { updatePatientUI } from '../../actions/patient/updatePatientUIAction';
import { resetPatientForm } from '../../actions/patient/resetPatientFormAction';

@Component({
  selector: 'patient-form-container',
  template: `
  <div>
    <patient-form
      [patientForm]="patientForm"
      [specialties]="specialties"
      [doctors]="doctors"
      [onSave]="savePatient.bind(this)"
      [navigateBack]="navigateBack.bind(this)"
      [onChange]="updatePatientFormUI.bind(this)">
    </patient-form>
  </div>
  `
})
class PatientFormContainer {
  specialties: Array<string>;
  doctors: Array<string>;
  patientForm: PatientFormState;
  private patientId: number;

  constructor(private route: ActivatedRoute, private router: Router,
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

  savePatient(patient: Patient) {
    this.store.dispatch(savePatient(patient));
  }

  navigateBack(event?: any) {
    if (event) {
      event.preventDefault();    
    }
    this.store.dispatch(resetPatientForm());
    this.router.navigate(['/patients']);
  }

  updateState() {
    let state: AppState = this.store.getState();
    this.specialties = state.specialties;
    this.doctors = state.doctors;
    this.patientForm = state.patientForm;

    if (state.patientForm.isSaveCompleted) {
        this.navigateBack();
    }
  }

  updatePatientFormUI(event: any) {
    var field = event.target.id;
    var value = event.target.value;

    this.store.dispatch(updatePatientUI(field, value));
  }
}

export {
  PatientFormContainer
}
