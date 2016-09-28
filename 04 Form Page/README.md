# 04 Form Page
Let's get started working with forms.

In this demo will create a Patient form page to create and update patient appointments.

We will start from sample **03 List Page**.

Summary steps:
- Add new methods to Patient API.
- Install and configure *@angular/forms*.
- Add route with params.
- Create Patient Component.
- Update Model.

## Required dependencies
- *03 List Page* dependencies
- @angular/forms

# API

We add new methods:

- Retrieve doctor collection.
- Retrieve patient by id.
- Save patient.

## Definition:
### src/api/patientAPI.ts
```
...
import { patientsMockData, specialtiesMockData, doctorsMockData } from './mockData';
...

getAllDoctorsAsync(): Promise<Array<string>> {
  let doctorsPromise = new Promise((resolve, reject) => {
    resolve(doctorsMockData);
  });

  return doctorsPromise;
};

getPatientByIdAsync(id: number): Promise<Patient> {
  let patientPromise = new Promise((resolve, reject) => {
    let patient = patientsMockData.find((patient: Patient) => {
      return patient.id === id;
    });

    resolve(patient);
  });

  return patientPromise;
};

savePatient(currentPatient: Patient): void {
  let patient = patientsMockData.find((patient: Patient) => {
    return patient.id === currentPatient.id;
  });

  if (patient) {
      let patientIndex = patientsMockData.indexOf(patient);
      patientsMockData.splice(patientIndex, 1, currentPatient);
  } else {
    let lastId = patientsMockData[patientsMockData.length -1].id;
    currentPatient.id = lastId + 1;

    patientsMockData.push(currentPatient);
  }

  patient = currentPatient;
}

...
```

# Install and configure @angular/forms

Installing:

```
npm install @angular/forms --save
```

## Configure
### webpack.config.js
```
...

vendor: [
  ...
  "@angular/forms"
],
  ...
  ```

### src/index.ts

```
...
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
...

imports: [
  ...
  FormsModule,
  ReactiveFormsModule
],
...
```

# Routes

We're going to refactor patient route to allow params

## Definition
### src/routes.ts

```
...

const routes: Routes = [
...
  { path: 'patient/:id', component: PatientPage }
];
```

## Using routerLink with params
### src/components/patients/patientList.ts
```
...
<div class="well">
  <div class="row">
    <div class="col-xs-offset-11 col-xs-1">
      <div class="pull-right">
        <span class="glyphicon glyphicon-plus-sign" [routerLink]="['/patient', 0]"></span>
      </div>
...

<td class="hidden-xs">
  {{p.time}}
  <span class="pull-right glyphicon glyphicon-pencil"
    [routerLink]="['/patient', p.id]">
  </span>
</td>
...
```


# Model
### src/model/patient.ts

We need to initialize properties to default values to avoid form errors like:

>core.umd.js:3427 EXCEPTION: Uncaught (in promise): Error: Error in ./PatientForm class PatientForm - inline template:16:12 caused by: Cannot find control with unspecified name attribute

```
export class Patient {
  id: number;
  dni: string;
  name: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;

  constructor() {
    this.id = 0;
    this.dni = "";
    this.name = "";
    this.specialty = "";
    this.doctor = "";
    this.date = "";
    this.time = "";
  }
}
```

# Patient Component

### src/components/patient/patientForm.ts

We're going to create patient form, and update values on changes.

```
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Patient } from '../../model/patient';
import { FormBuilder, FormGroup } from '@angular/forms';
import { patientAPI } from '../../api/patientAPI';

@Component({
  selector: 'patient-form',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Editar Cita - Centro de Día</h2>
      </div>
    </div>

    <div class="row">
      <form [formGroup]="patientForm" id="edit-patient-form">
        <div class="col-xs-12 form-group">
          <label>Datos Paciente</label>
        </div>
        <div class="col-sm-6 form-group">
          <label for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            [formControl]="patientForm.controls['dni']"/>
        </div>
        <div class="col-sm-6 form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name"
            [formControl]="patientForm.controls['name']"/>
        </div>
        <div class="col-xs-12 form-group">
          <label>Datos Cita</label>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="date">Fecha</label>
          <input type="date" class="form-control" id="date"
            [formControl]="patientForm.controls['date']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="time">Hora</label>
          <input type="time" class="form-control" id="time"
            [formControl]="patientForm.controls['time']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="specialty">Especialidad</label>
          <select id="specialty" class="form-control"
            [formControl]="patientForm.controls['specialty']">
            <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
          </select>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="doctor">Doctor</label>
          <select id="doctor" class="form-control"
            [formControl]="patientForm.controls['doctor']">
            <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
          </select>
        </div>

        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button type="button" (click)="savePatient($event, patientForm.value)" class="btn btn-success">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
class PatientForm implements OnChanges {
  @Input() specialties: Array<string>;
  @Input() doctors: Array<string>;
  @Input() patient: Patient;
  @Input() savePatient: (patient: Patient) => void;
  patientForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.patient = new Patient();
    this.patientForm = formBuilder.group(this.patient);
  }

  ngOnChanges(changes) {
    let patient: SimpleChange = changes['patient'];

    if(patient && patient.currentValue) {
      this.patientForm.setValue(patient.currentValue);
    }
  }
}

export {
  PatientForm
}
```

This component is a form where we're going to retrieve patient data from server
if it's an existing patient or create new if not, and save changes.


## Definition:
### src/components/patient/patientPage.ts

We're retrieving data from server and inject it child component (patientForm).

```
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientAPI } from '../../api/patientAPI';
import { Patient } from '../../model/patient';

@Component({
  selector: 'patient-page',
  template: `
  <div >
    <patient-form [patient]="patient"
      [specialties]="specialties"
      [doctors]="doctors"
      [savePatient]="savePatient.bind(this)">
    </patient-form>
  </div>
  `
})
class PatientPage {
  specialties: Array<string>;
  doctors: Array<string>;
  patientId: number;
  patient: Patient;

  constructor(private route: ActivatedRoute, private router: Router, private patientAPI : PatientAPI) {
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
      this.patientAPI.getPatientByIdAsync(this.patientId)
        .then((patient: Patient) => {
          this.patient = patient;
        });
    }
  }

  private loadRelatedCollections() {
    Promise.all([
      this.patientAPI.getAllSpecialtiesAsync(),
      this.patientAPI.getAllDoctorsAsync()
    ]).then((data) => {
      this.specialties = data[0];
      this.doctors = data[1];
    });
  }

  savePatient(event: any, patient: Patient){
    event.preventDefault();
    this.patientAPI.savePatient(patient);
    this.router.navigate(['/patients']);
  }
}

export {
  PatientPage
}
```
