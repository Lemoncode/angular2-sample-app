import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStore, store } from './store';

import { App } from './components/app';
import { Header } from './components/common/header';
import { LoginPage } from './components/login/loginPage';
import { Banner } from './components/login/banner';
import { LoginForm } from './components/login/loginForm';
import { PatientsPage } from './components/patients/patientsPage';
import { SearchPatient } from './components/patients/searchPatient';
import { PatientListContainer } from './components/patients/patientList.container';
import { PatientList } from './components/patients/patientList';
import { PatientPage } from './components/patient/patientPage';
import { PatientForm } from './components/patient/patientForm';

@NgModule({
  declarations: [
    App,
    Header,
    LoginPage,
    Banner,
    LoginForm,
    PatientsPage,
    SearchPatient,
    PatientListContainer,
    PatientList,
    PatientPage,
    PatientForm
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [App],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: AppStore, useValue: store }
  ]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
