import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {APIModule} from '../../api/';

import {PatientsPage} from './patientsPage';
import {PatientList} from './patientList';
import {SearchPatient} from './searchPatient';
import {PatientButtonAdd} from "./components/patientButtonAdd";
import {PatientListTable} from "./components/patientListTable";
import {PatientRow} from "./components/patientRow";

@NgModule({
  declarations: [
    PatientsPage,
    PatientList,
    SearchPatient,
    PatientButtonAdd,
    PatientListTable,
    PatientRow
  ],
  imports: [
    BrowserModule,
    RouterModule,
    APIModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class PatientsModule {

}
