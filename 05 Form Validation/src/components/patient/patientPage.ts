import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { patientAPI } from '../../api/patientAPI';
import { Patient } from '../../model/patient';

@Component({
  selector: 'patient-page',
  template: `
  <div >
    <patient-form [patient]="patient"
      [specialties]="specialties"
      [doctors]="doctors"
      [savePatient]="savePatient.bind(this)"
      [navigateBack]="navigateBack.bind(this)">
    </patient-form>
  </div>
  `
})
class PatientPage {
  specialties: Array<string>;
  doctors: Array<string>;
  patientId: number;
  patient: Patient;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.loadPatientId();
    this.loadPatient();
    this.loadRelatedCollections();
  }

  private loadPatientId() {
    this.route.params.subscribe(params => {
      this.patientId = parseInt(params['id']);
    });
  }

  private loadPatient() {
    if (this.patientId > 0) {
      patientAPI.getPatientByIdAsync(this.patientId)
        .then((patient: Patient) => {
          this.patient = patient;
        });
    }
  }

  private loadRelatedCollections() {
    Promise.all([
      patientAPI.getAllSpecialtiesAsync(),
      patientAPI.getAllDoctorsAsync()
    ]).then((data) => {
      this.specialties = data[0];
      this.doctors = data[1];
    });
  }

  savePatient(event: any, patient: Patient){
    patientAPI.savePatient(patient);
    this.navigateBack(event);
  }

  navigateBack(event: any) {
    event.preventDefault();
    this.router.navigate(['/patients']);
  }
}

export {
  PatientPage
}
