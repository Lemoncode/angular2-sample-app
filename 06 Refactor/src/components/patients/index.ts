import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {APIModule} from '../../api/';

import {PatientsPage} from './patientsPage';
import {PatientList} from './patientList';
import {SearchPatient} from './searchPatient';

@NgModule({
  declarations: [
    PatientsPage,
    PatientList,
    SearchPatient,
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
