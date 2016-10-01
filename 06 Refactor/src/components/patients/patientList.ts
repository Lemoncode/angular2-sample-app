import { Component } from '@angular/core';
import { Promise } from 'core-js/es6';

import { Patient } from '../../model/patient';
import { PatientAPI } from '../../api/patientAPI';
import { PatientButtonAdd } from "./components/patientButtonAdd";
import { PatientListTable } from "./components/patientListTable";

@Component({
  selector: 'patient-list',
  template: `
  <div class="well">
    <patient-button-add></patient-button-add>
    <patient-list-table [patients]="patients"></patient-list-table>
  </div>
  `
})
class PatientList {
  patients: Array<Patient>;

  constructor(patientAPI : PatientAPI) {
    patientAPI.getAllPatientsAsync().then((patients: Array<Patient>) => {
      this.patients = patients;
    });
  }
}

export {
  PatientList
}
