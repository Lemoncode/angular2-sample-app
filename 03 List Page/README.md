# 03 List Page
Let's get started working with lists.

In this demo will create a Patients list page and get data from API.

We will start from sample **02 Navigation**.

Summary steps:
- Create Patient Model.
- Create Patient API.
- Create Patients component.
- Create dummy Patient component.
- Create Patient route.

## Required dependencies
- *02 Navigation* dependencies
- Promise from **core-js/es6** (already installed), it's same package like [es6-promise](https://www.npmjs.com/package/es6-promise)

# Model

### src/model/patient.ts

```
export class Patient {
  id: number;
  dni: string;
  name: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
}
```

# API

We're going to create a fake API with mock data to retrieve patients and
specialties collections.

## Definition:
### src/api/patientAPI.ts

We are using Promise from *core-js/es6* to create an async request and resolve
mock data collections.

```
import { Promise } from 'core-js/es6';
import { Patient } from '../model/patient';
import { patientsMockData, specialtiesMockData } from './mockData';

class PatientAPI {
  getAllPatientsAsync(): Promise<Array<Patient>> {
    let patientsPromise = new Promise((resolve, reject) => {
      resolve(patientsMockData);
    });

    return patientsPromise;
  };

  getAllSpecialtiesAsync(): Promise<Array<string>> {
    let specialtiesPromise = new Promise((resolve, reject) => {
      resolve(specialtiesMockData);
    });

    return specialtiesPromise;
  }
}

const patientAPI = new PatientAPI();

export {
  patientAPI
}
```

### src/api/mockData.ts

Class with mock data collections.

```
import { Patient } from '../model/patient';

const patientsMockData: Array<Patient> = [
  { id: 1, dni: "1234567A", name: "John Doe", specialty: "Traumatología", doctor: "Karl J. Linville", date: "19/09/2019", time: "08:30" },
  { id: 2, dni: "5067254B", name: "Anna S. Batiste", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "19/09/2019", time: "09:00" },
  { id: 3, dni: "1902045C", name: "Octavia L. Hilton", specialty: "Traumatología", doctor: "Karl J. Linville", date: "19/09/2019", time: "09:30" },
  { id: 4, dni: "1880514D", name: "Tony M. Herrera", specialty: "Oftalmología", doctor: "Ruthie A. Nemeth", date: "19/09/2019", time: "10:00" },
  { id: 5, dni: "6810774E", name: "Robert J. Macias", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "19/09/2019", time: "10:30" }
];

const specialtiesMockData: Array<string> = [
  "Cirugía",
  "Traumatología",
  "Oftalmología"
];

export {
  patientsMockData,
  specialtiesMockData
}
```

# Patients component

This component is composed by two: search patient and patient list.

## Definition:
### src/components/patients/searchPatient.ts

We're going to create a dummy form to search patients. In class constructor,
we retrieve specialties collection from server through patientAPI.

We're using NgFor directive `<option *ngFor="let s of specialties">{{s}}</option>`
to render specialties collection inside a *select* HTML element.

```
import { Component } from '@angular/core';
import { Promise } from 'core-js/es6';
import { patientAPI } from '../../api/patientAPI';

@Component({
  selector: 'search-patient',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-12">
        <span class="col-xs-1 glyphicon glyphicon-search"></span>
        <p class="col-xs-9">Buscar paciente</p>
        <span class="collapse-toggle pull-right glyphicon glyphicon-collapse-down" data-toggle="collapse"
          data-target="#search-form">
        </span>
      </div>
      <form id="search-form" class="collapse">
        <div class="col-xs-6 form-group">
          <label for="date">Fecha</label>
          <input type="date" class="form-control" id="date"/>
        </div>
        <div class="col-xs-6 form-group">
          <label for="time">Hora</label>
          <input type="time" class="form-control" id="time"/>
        </div>
        <div class="col-xs-12 form-group">
          <select class="form-control">
            <option *ngFor="let s of specialties">{{s}}</option>
          </select>
        </div>
        <div class="col-xs-12 form-group">
          <label for="doctor">Doctor</label>
          <input type="text" class="form-control" id="doctor"/>
        </div>
        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button (click)="searchPatient($event)" class="btn btn-primary">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
class SearchPatient {
  specialties: Array<string>;

  constructor() {
    patientAPI.getAllSpecialtiesAsync().then((specialties: Array<string>) => {
      this.specialties = specialties;
    });
  }

  searchPatient(event){
    event.preventDefault();
  }
}

export {
  SearchPatient
}
```

### src/components/patients/patientList.ts

We're going to create a table with patients collection retrieved by patient API.
We can convert this table to responsive, hiding columns with bootstrap classes.
We're using **routerLink** to navigate to patient page.

```
import { Component } from '@angular/core';
import { Patient } from '../../model/patient';
import { Promise } from 'core-js/es6';
import { patientAPI } from '../../api/patientAPI';

@Component({
  selector: 'patient-list',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-offset-11 col-xs-1">
        <div class="pull-right">
          <span class="glyphicon glyphicon-plus-sign" [routerLink]="['/patient']"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="col-xs-12 table table-striped table-bordered">
        <thead>
          <tr>
            <th class="hidden-xs hidden-sm hidden-md">DNI</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th class="hidden-xs hidden-sm hidden-md">Doctor</th>
            <th class="hidden-xs">Cita</th>
            <th class="hidden-xs">Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of patients">
            <td class="hidden-xs hidden-sm hidden-md">{{p.dni}}</td>
            <td>{{p.name}}</td>
            <td>
              {{p.specialty}}
              <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
                [routerLink]="['/patient']">
              </span>
            </td>
            <td class="hidden-xs hidden-sm hidden-md">{{p.doctor}}</td>
            <td class="hidden-xs">{{p.date}}</td>
            <td class="hidden-xs">
              {{p.time}}
              <span class="pull-right glyphicon glyphicon-pencil"
                [routerLink]="['/patient']">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
class PatientList {
  patients: Array<Patient>;

  constructor() {
    patientAPI.getAllPatientsAsync().then((patients: Array<Patient>) => {
      this.patients = patients;
    });
  }
}

export {
  PatientList
}
```

## Using components
### src/components/patients/patientsPage.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-patient class="col-md-4"></search-patient>
      <patient-list class="col-md-8"></patient-list>
    </div>
  </div>
  `
})
class PatientsPage {

}

export {
  PatientsPage
}

```

## Configuration
### src/index.ts
```
...

import { PatientsPage } from './components/patients/patientsPage';
import { SearchPatient } from './components/patients/searchPatient';
import { PatientList } from './components/patients/patientList';
...

@NgModule({
  declarations: [
    ...
    PatientsPage,
    SearchPatient,
    PatientList,
    ...
```

# Patient component

In next sample, this component will be a patient form to create new and edit
existing one.

## Definition:
### src/components/patient/patientPage.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'patient-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <h1>Patient Page</h1>
    </div>
  </div>
  `
})
class PatientPage {

}

export {
  PatientPage
}

```

## Configuration
### src/index.ts
```
...

import { PatientPage } from './components/patient/patientPage';
...

@NgModule({
  declarations: [
    ...
    PatientPage
    ...
```

# Routes

We're creating patient route to navigate to Patient page form.

## Definition
### src/routes.ts

```
...
import { PatientPage } from './components/patient/patientPage';

const routes: Routes = [
...
  { path: 'patient', component: PatientPage }
];
```
