# 07 Redux
Let's get started working with Redux.

In this demo will use Angular with Redux.

We will start from sample **05 Form Validation**.

Summary steps:
- Remove *@angular/forms*.
- Install [redux](https://github.com/reactjs/redux) and [redux-thunk](https://github.com/gaearon/redux-thunk).
- Remove PatientAPI from Angular DI
- Create States.
- Create Actions.
- Create Reducers.
- Create Store.
- Split components into Containers and Presentational components.
- Refactor validators.

## Required dependencies
- *05 Form Validation* dependencies
- Remove @angular/forms dependency because we don't need it
- redux
- redux-thunk

## Typings dependencies
- redux
- redux-thunk

```
typings install dt~redux dt~redux-thunk --save --global
```

# Remove @angular/forms
Uninstalling:

```
npm uninstall @angular/forms --save
```

## Configure
### webpack.config.js

```javascript
...
vendor: [
  "@angular/forms" <-- Remove
],
...
```

### src/index.ts

```javascript
...
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; <-- Remove
...

imports: [
  ...
  FormsModule, <-- Remove
  ReactiveFormsModule <-- Remove
  ...
],
```

# Install and configure redux and redux-thunk

Installing:

```javascript
npm install redux redux-thunk --save
```

## Configure
### webpack.config.js
```javascript
...
vendor: [
  ...
  "redux",
  "redux-thunk"
],
  ...
```

# API
We are going to remove patientAPI from Angular dependency injection because we are
not going to use API in Angular components. We are going to use it in Redux actions.

## Configure
### src/api/patientAPI.ts

```javascript
...

let patientAPI: PatientAPI = new PatientAPI();

export {
  patientAPI
}
```

### src/components/app.ts

```javascript
...
import {PatientAPI} from '../api/patientAPI'; <-- Remove

...
@Component(
  {
    selector: 'app',
    template: `
      <div class="container-fluid">
        <header></header>

        <router-outlet></router-outlet>
      </div>
    `
  }
)
...
```

# States
We are going to create our app states.

## Configure

### src/states/patientFormState.ts
PatientForm state is used to know about Patient form values, validations, etc.
That is, PatientForm Component state.

```javascript
import { Patient } from '../model/patient';

export class PatientFormState {
  patient: Patient;
  isValid: boolean;
  errors: PatientFormErrors;
  isSaveCompleted: boolean;

  constructor() {
    this.patient = new Patient();
    this.isValid = true;
    this.errors = new PatientFormErrors();
    this.isSaveCompleted = false;
  }
}

export class PatientFormErrors {
  dni: FormError;
  name: FormError;
  date: FormError;
  time: FormError;
  specialty: FormError;
  doctor: FormError;

  constructor () {
    this.dni = new FormError();
    this.name = new FormError();
    this.date = new FormError();
    this.time = new FormError();
    this.specialty = new FormError();
    this.doctor = new FormError();
  }
}

export class FormError {
  isValid: boolean;
  errorMessage: string;

  constructor() {
    this.isValid = true;
    this.errorMessage = "";
  }
}
```

### src/states/appState.ts
Interface with app state

```javascript
import { Patient } from '../model/patient';
import { PatientFormState } from './patientFormState';

export interface AppState {
  patients: Array<Patient>;
  specialties: Array<string>;
  doctors: Array<string>;
  patientForm: PatientFormState;
}
```

# Actions

We are going to create actions that we are going to dispatch with user interaction.

## Doctor actions

### src/actions/doctors/assignDoctorsAction.ts
This is a simple Redux action. In this file we are going to create an ActionCreator
that returns a simple Action to assign doctor array.

```javascript
import { Action, ActionCreator } from 'redux';

export const ASSIGN_DOCTORS: string = "ASSIGN_DOCTORS";
export interface AssignDoctorsAction extends Action {
  doctors: Array<string>;
}

export const assignDoctors: ActionCreator<AssignDoctorsAction> =
(doctors: Array<string>) => ({
  type: ASSIGN_DOCTORS,
  doctors
});

```

### src/actions/doctors/loadDoctorsAction.ts
This is an async action. First we are going to retrieve doctors from server through
patientAPI and **redux-thunk** feed this action with dispatcher to dispatch
a simple action like assignDoctors after resolve promise.

```javascript
import { patientAPI } from '../../api/patientAPI';
import { assignDoctors } from './assignDoctorsAction';

export const loadDoctors = () => {
  return dispatcher => {
    patientAPI.getAllDoctorsAsync().then((doctors: Array<string>) => {
      dispatcher(assignDoctors(doctors));
    });
  }
}
```

## Patients actions

### src/actions/patients/assignPatientsAction.ts
```javascript
import { Action, ActionCreator } from 'redux';

export const ASSIGN_DOCTORS: string = "ASSIGN_DOCTORS";
export interface AssignDoctorsAction extends Action {
  doctors: Array<string>;
}

export const assignDoctors: ActionCreator<AssignDoctorsAction> =
(doctors: Array<string>) => ({
  type: ASSIGN_DOCTORS,
  doctors
});
```

### src/actions/patients/loadPatientsAction.ts
```javascript
import { patientAPI } from '../../api/patientAPI';
import { Patient } from '../../model/patient';
import { assignPatients } from './assignPatientsAction';

export const loadPatients = () => {
  return dispatcher => {
    patientAPI.getAllPatientsAsync().then((patients: Array<Patient>) => {
      dispatcher(assignPatients(patients));
    });
  }
};
```

## Specialties actions

### src/actions/specialties/assignSpecialtiesAction.ts

```javascript
import { Action, ActionCreator } from 'redux';

export const ASSIGN_SPECIALTIES: string = "ASSIGN_SPECIALTIES";
export interface AssignSpecialtiesAction extends Action {
  specialties: Array<string>;
}

export const assignSpecialties: ActionCreator<AssignSpecialtiesAction> =
(specialties: Array<string>) => ({
    type: ASSIGN_SPECIALTIES,
    specialties
  });
```

### src/actions/specialties/loadSpecialtiesAction.ts
```javascript
import { patientAPI } from '../../api/patientAPI';
import { assignSpecialties } from './assignSpecialtiesAction';

export const loadSpecialties = () => {
  return dispatcher => {
    patientAPI.getAllSpecialtiesAsync().then((specialties: Array<string>) => {
      dispatcher(assignSpecialties(specialties));
    });
  }
}
```

## Patient actions

### src/actions/patient/assignPatientAction.ts

```javascript
import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';

export const ASSIGN_PATIENT: string = "ASSIGN_PATIENT";
export interface AssignPatientAction extends Action {
  patient: Patient;
}

export const assignPatient: ActionCreator<AssignPatientAction> =
(patient: Patient) => ({
  type: ASSIGN_PATIENT,
  patient
});
```

### src/actions/patient/loadPatientAction.ts
```javascript
import { Patient } from '../../model/patient';
import { patientAPI } from '../../api/patientAPI';
import { assignPatient } from './assignPatientAction';

export const loadPatientById = (id: number) => {
  return dispatcher => {
    if (id > 0) {
      patientAPI.getPatientByIdAsync(id).then((patient: Patient) => {
        dispatcher(assignPatient(patient));
      });
    } else {
      const patient = new Patient();
      dispatcher(assignPatient(patient));
    }
  }
};
```

### src/actions/patient/updatePatientUIAction.ts
Action to update form field and validate value when user write data on input element.

```javascript
import { Action, ActionCreator } from 'redux';
import { FormError } from '../../states/patientFormState';
import { patientFormValidator } from '../../validators/patientFormValidator';

export const PATIENT_UI_INPUT: string = "PATIENT_UI_INPUT";
export interface PatientUIInputAction extends Action {
  fieldName: string;
  value: any;
  formError: FormError;
}

export const updatePatientUI: ActionCreator<PatientUIInputAction> =
(fieldName: string, value: any) => {
  let formError: FormError = patientFormValidator.validateField(fieldName, value);

  return {
      type: PATIENT_UI_INPUT,
      fieldName,
      value,
      formError
  }
}
```

### src/actions/patient/savePatientAction.ts
Action to validate all patient fields and if it's valid, save changes.

```javascript
import { Action, ActionCreator } from 'redux';
import { Patient } from '../../model/patient';
import { PatientFormState } from '../../states/patientFormState';
import { patientAPI } from '../../api/patientAPI';
import { patientFormValidator } from '../../validators/patientFormValidator';

export const SAVE_PATIENT: string = "SAVE_PATIENT";
export interface SavePatientAction extends Action {
  patientFormState: PatientFormState;
}
export const savePatient: ActionCreator<SavePatientAction> =
(patient: Patient) => {
  let patientFormState = patientFormValidator.validatePatient(patient);

  if (patientFormState.isValid) {
    patientAPI.savePatient(patient);
    patientFormState.isSaveCompleted = true;
  }

  return {
    type: SAVE_PATIENT,
    patientFormState
  }
}
```

### src/actions/patient/resetPatientFormAction.ts
```javascript
import { Action, ActionCreator } from 'redux';

export const RESET_PATIENT_FORM: string = "RESET_PATIENT_FORM";

export const resetPatientForm: ActionCreator<Action> = () => ({
  type: RESET_PATIENT_FORM
});
```

# Reducers
Reducers are responsible for "updating" the state after dispatch one action.
That is, giving a state and an action, reducers return a new state.

## Doctor reducer

### src/reducers/doctorsReducer.ts
With [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) **...**, we are copying each item and returning a new array. If we return new state instead of mutate the given, it gives us better performance.

```javascript
import { Reducer } from 'redux';
import { ASSIGN_DOCTORS, AssignDoctorsAction } from '../actions/doctors/assignDoctorsAction';

export const doctorsReducer: Reducer<Array<string>> =
(state: Array<string> = [], action: AssignDoctorsAction): Array<string> => {
  switch(action.type) {
    case ASSIGN_DOCTORS:
      return [...action.doctors];

    default:
      return state;
  }
};
```

### src/reducers/patientsReducer.ts
```javascript
import { Reducer } from 'redux';
import { Patient } from '../model/patient';
import { ASSIGN_PATIENTS, AssignPatientsAction } from '../actions/patients/assignPatientsAction';

export const patientsReducer: Reducer<Array<Patient>> =
(state: Array<Patient> = [], action: AssignPatientsAction): Array<Patient> => {
  switch(action.type) {
    case ASSIGN_PATIENTS:
      return [...action.patients];

    default:
      return state;
  }
};
```

### src/reducers/specialtiesReducer.ts
```javascript
import { Reducer } from 'redux';
import { ASSIGN_SPECIALTIES, AssignSpecialtiesAction } from '../actions/specialties/assignSpecialtiesAction';

export const specialtiesReducer: Reducer<Array<string>> =
(state: Array<string> = [], action: AssignSpecialtiesAction): Array<string> => {
  switch(action.type) {
    case ASSIGN_SPECIALTIES:
      return [...action.specialties];

    default:
      return state;
  }
};
```

### src/reducers/patientReducer.ts
At equals like spread operator, [Object.assign](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign) is used to copy values from properties and return a **new** object .

```javascript
import { Reducer, Action } from 'redux';
import { Patient } from '../model/patient';
import { PatientFormState, PatientFormErrors } from '../states/patientFormState';
import { ASSIGN_PATIENT, AssignPatientAction } from '../actions/patient/assignPatientAction';
import { PATIENT_UI_INPUT, PatientUIInputAction } from '../actions/patient/updatePatientUIAction';
import { SAVE_PATIENT, SavePatientAction } from '../actions/patient/savePatientAction';
import { RESET_PATIENT_FORM } from '../actions/patient/resetPatientFormAction';

export const patientReducer: Reducer<PatientFormState> =
(state: PatientFormState = new PatientFormState(), action: Action): PatientFormState => {
  switch(action.type) {
    case ASSIGN_PATIENT:
      return assignPatient(state, action as AssignPatientAction);

    case PATIENT_UI_INPUT:
      return patientUIInput(state, action as PatientUIInputAction);

    case SAVE_PATIENT:
      return savePatient(state, action as SavePatientAction);

    case RESET_PATIENT_FORM:
      return Object.assign({}, state, new PatientFormState());

    default:
      return state;
  }
};

const assignPatient = (state: PatientFormState, action: AssignPatientAction) => {
  return Object.assign({}, state, {
    patient: action.patient
  });
}

const patientUIInput = (state: PatientFormState, action: PatientUIInputAction) => {
  let patient = Object.assign({}, state.patient, {
    [action.fieldName]: action.value
  });

  let errors = Object.assign({}, state.errors, {
    [action.fieldName]: action.formError
  });

  return Object.assign({}, state, {
    patient,
    errors,
    isValid: isFormValid(errors)
  });
}

const isFormValid = (errors: PatientFormErrors): boolean => {
  return Object.keys(errors).every((key) => {
    return errors[key].isValid;
  });
}

const savePatient = (state: PatientFormState, action: SavePatientAction) => {
  return Object.assign({}, state, action.patientFormState);
}
```

### src/reducers/index.ts
In this file, we are going to combine all reducers in one and use this object to
feed the store.

```javascript
import { Reducer, combineReducers } from 'redux';
import { AppState } from '../states/appState';
import { patientsReducer } from './patientsReducer';
import { specialtiesReducer } from './specialtiesReducer';
import { doctorsReducer } from './doctorsReducer';
import { patientReducer } from './patientReducer';

export const reducers: Reducer<AppState> = combineReducers<AppState>({
  patients: patientsReducer,
  specialties: specialtiesReducer,
  doctors: doctorsReducer,
  patientForm: patientReducer
});
```

# Store
We are going to create AppStore that we are going to use in components to get the app
state and dispatch actions.

## Configure
- [Redux DevTools](https://github.com/gaearon/redux-devtools): is a live-editing time travel environment for Redux. We can download Chrome extension [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd). This feature is optional.

- In this file, we are going to configure store, adding [middlewares](http://redux.js.org/docs/advanced/Middleware.html) like redux-thunk and reducers.

- Due to Store from Redux is an interface and we can't use interfaces as a dependency
 injection key, we need to define something to be injectable. Angular provides OpaqueToken that it's a better choice thant injecting a string directly because it helps us avoid collisions.

```javascript
import { Store, StoreEnhancer, createStore, compose, applyMiddleware  } from 'redux';
import { reducers } from './reducers';
import { AppState } from './states/appState';
import { OpaqueToken } from '@angular/core';
import ReduxThunk from 'redux-thunk';

let devTools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() :
  f => f;

export let store: Store<AppState> = createStore<any>(
  reducers,
  compose(
    applyMiddleware(ReduxThunk),
    devTools
  )
);

//Due to Store from Redux is an interface and we can't use interfaces as a
//dependency injection key, we need to define something to be injectable.
//Angular provides OpaqueToken that it's a better choice thant injecting
//a string directly because it helps us avoid collisions.
export const AppStore = new OpaqueToken('App.store');
```

# Components
We are going to split components into Containers and Presentational components.

- **Container**: responsible to get state from store, pass properties to presentational
components, and use store to dispatch actions.

- **Presentational**: responsible to have component DOM markup and styles.

## Refactor Patients Component

### src/components/patients/patientList.ts
This is now a presentational component. We remove all code related with PatientAPI.

```javascript
import { Component, Input } from '@angular/core';
import { Patient } from '../../model/patient';

@Component({
  selector: 'patient-list',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-offset-11 col-xs-1">
        <div class="pull-right">
          <span class="glyphicon glyphicon-plus-sign" [routerLink]="['/patient', 0]"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="col-xs-12 table table-striped table-bordered">
        <thead>
          <tr>
            <th class="hidden-xs hidden-sm hidden-md">DNI</th>
            <th>Patient</th>
            <th>Specialty</th>
            <th class="hidden-xs hidden-sm hidden-md">Doctor</th>
            <th class="hidden-xs">Date</th>
            <th class="hidden-xs">Time</th>
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
                [routerLink]="['/patient', p.id]">
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
  @Input() patients: Array<Patient>;
}

export {
  PatientList
}
```

### src/components/patients/patientList.container.ts
```javascript
import { Component, Inject } from '@angular/core';
import { Patient } from '../../model/patient';
import { Store } from 'redux';
import { AppStore } from '../../store';
import { AppState } from '../../states/appState';
import { loadPatients } from '../../actions/patients/loadPatientsAction';

@Component({
  selector: 'patient-list-container',
  template: `
  <patient-list [patients]="patients">
  </patient-list>
  `
})
class PatientListContainer {
  patients: Array<Patient>;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
    store.dispatch(loadPatients());
  }

  updateState() {
    let state: AppState = this.store.getState();
    this.patients = state.patients;
  }
}

export {
  PatientListContainer
}
```

### src/components/patients/searchPatient.ts
```javascript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-patient',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-12">
        <span class="col-xs-1 glyphicon glyphicon-search"></span>
        <p class="col-xs-9">Search patient</p>
        <span class="collapse-toggle pull-right glyphicon glyphicon-collapse-down" data-toggle="collapse"
          data-target="#search-form">
        </span>
      </div>
      <form id="search-form" class="collapse">
        <div class="col-xs-6 form-group">
          <label for="date">Date</label>
          <input type="date" class="form-control" id="date"/>
        </div>
        <div class="col-xs-6 form-group">
          <label for="time">Time</label>
          <input type="time" class="form-control" id="time"/>
        </div>
        <div class="col-xs-12 form-group">
          <label for="specialty">Specialty</label>
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
            <button (click)="searchPatient($event)" class="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
class SearchPatient {
  @Input() specialties: Array<string>;
  @Input() searchPatient: (event: any) => void;
}

export {
  SearchPatient
}
```

### src/components/patients/searchPatient.container.ts
```javascript
import { Component, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppStore } from '../../store';
import { AppState } from '../../states/appState';
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
```

### src/components/patients/patientsPage.ts
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-patient-container class="col-md-4"></search-patient-container>
      <patient-list-container class="col-md-8"></patient-list-container>
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

## Patient Form
Rename patientPage.ts to patientForm.container.ts

### src/components/patient/patientForm.container.ts
```javascript
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
```

### src/components/patient/patientForm.ts
**Important here**: Redux is a simplification of [Flux](https://facebook.github.io/flux/docs/overview.html#content), both patterns are
working with unidirectional data flow. So we need to use one-way data bindings in Angular.

```javascript
<input type="text" class="form-control" id="dni"
  value={{patientForm.patient.dni}}
  (input)="onChange($event)"/>
```

```javascript
import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../model/patient';
import { PatientFormState } from '../../states/patientFormState';

@Component({
  selector: 'patient-form',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Appointment</h2>
      </div>
    </div>

    <form id="edit-patient-form">
      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Patient Info</label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 form-group" [class.has-error]="!patientForm.errors.dni.isValid">
          <label class="control-label" for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            value={{patientForm.patient.dni}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.dni.isValid" class="help-block">{{patientForm.errors.dni.errorMessage}}</span>
        </div>
        <div class="col-sm-6 form-group" [class.has-error]="!patientForm.errors.name.isValid">
          <label class="control-label" for="name">Name</label>
          <input type="text" class="form-control" id="name"
            value={{patientForm.patient.name}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.name.isValid" class="help-block">{{patientForm.errors.name.errorMessage}}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Appointment Info</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.date.isValid">
          <label class="control-label" for="date">Date</label>
          <input type="date" class="form-control" id="date"
            value={{patientForm.patient.date}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.date.isValid" class="help-block">{{patientForm.errors.date.errorMessage}}</span>
        </div>
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.time.isValid">
          <label class="control-label" for="time">Time</label>
          <input type="time" class="form-control" id="time"
            value={{patientForm.patient.time}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.time.isValid" class="help-block">{{patientForm.errors.time.errorMessage}}</span>
        </div>
        <div class="row-md">
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.specialty.isValid">
            <label class="control-label" for="specialty">Specialty</label>
            <select id="specialty" class="form-control"
              value={{patientForm.patient.specialty}}
              (change)="onChange($event)">
              <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
            </select>
            <span *ngIf="!patientForm.errors.specialty.isValid" class="help-block">{{patientForm.errors.specialty.errorMessage}}</span>
          </div>
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.doctor.isValid">
            <label class="control-label" for="doctor">Doctor</label>
            <select id="doctor" class="form-control"
              value={{patientForm.patient.doctor}}
              (change)="onChange($event)">
              <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
            </select>
            <span *ngIf="!patientForm.errors.doctor.isValid" class="help-block">{{patientForm.errors.doctor.errorMessage}}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-2 form-group">
          <div>
            <button type="button" class="btn btn-primary"
              (click)="navigateBack($event)">
              Back
            </button>
          </div>
        </div>
        <div class="col-xs-offset-8 col-xs-2 form-group">
          <div class="pull-right">
            <button type="button" class="btn btn-success"
              (click)="!patientForm.isValid || onSave(patientForm.patient)"
              [class.disabled]="!patientForm.isValid">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  `
})
class PatientForm implements OnInit {
  @Input() specialties: Array<string>;
  @Input() doctors: Array<string>;
  @Input() patientForm: PatientFormState;
  @Input() onSave: (patient: Patient) => void;
  @Input() navigateBack: (event: any) => void;
  @Input() onChange: (event: any) => void;

  ngOnInit() {
    this.patientForm = new PatientFormState();
  }
}

export {
  PatientForm
}

```

### src/routes.ts
```javascript
...
import { PatientFormContainer } from './components/patient/patientForm.container';
...
{ path: 'patient/:id', component: PatientFormContainer }
...
```

### src/index.ts
```javascript
...
import { AppStore, store } from './store';
...
import { SearchPatientContainer } from './components/patients/searchPatient.container';
import { PatientListContainer } from './components/patients/patientList.container';
import { PatientFormContainer } from './components/patient/patientForm.container';
...

declarations: [
  ...
  SearchPatientContainer,
  PatientListContainer,
  PatientFormContainer,
  ...
],
...
providers: [
  ...
  { provide: AppStore, useValue: store }
]
...
```

# Validators
Since we are not using *@angular/forms* we need to refactor validators

### src/validators/dniValidator.ts
```javascript
import {FormError } from '../states/patientFormState';
import { dniValidation } from '../validations/dniValidation';
import { requiredValidation } from '../validations/requiredValidation';

class DNIValidator {
  validateDNI(dni: string): FormError {
    let formError = new FormError();
    formError.isValid = true;

    switch (false) {
      case requiredValidation.isValid(dni):
        formError.isValid = false;
        formError.errorMessage = "Mandatory field";
        break;

      case dniValidation.hasValidFormat(dni):
        formError.isValid = false;
        formError.errorMessage = "Invalid format";
        break;

      case dniValidation.isValid(dni):
        formError.isValid = false;
        formError.errorMessage = "Invalid DNI";
        break;
    }

    return formError;
  }
}

const dniValidator = new DNIValidator();

export {
  dniValidator
}
```

### src/validators/requiredValidator.ts
```javascript
import { FormError } from '../states/patientFormState';
import { requiredValidation } from '../validations/requiredValidation';

class RequiredValidator {
  validateRequiredField(value: any): FormError {
    let formError = new FormError();
    formError.isValid = requiredValidation.isValid(value);

    if (!formError.isValid) {
      formError.errorMessage = "Mandatory field";
    }

    return formError;
  }
}

const requiredValidator = new RequiredValidator();

export {
  requiredValidator
}
```

### src/validators/patientFormValidator.ts
```javascript
import { Patient } from '../model/patient';
import { PatientFormState, PatientFormErrors, FormError } from '../states/patientFormState';
import { dniValidator } from './dniValidator';
import { requiredValidator } from './requiredValidator';

class PatientFormValidator {

  validateField(field: string, value: any): FormError {
    switch(field) {
      case "dni":
        return dniValidator.validateDNI(value);

      default:
        return requiredValidator.validateRequiredField(value);
    }
  }

  validatePatient(patient: Patient): PatientFormState {
    let patientFormState = new PatientFormState();
    patientFormState.patient = patient;

    patientFormState.errors.dni = dniValidator.validateDNI(patient.dni);
    patientFormState.errors.name = requiredValidator.validateRequiredField(patient.name);
    patientFormState.errors.date = requiredValidator.validateRequiredField(patient.date);
    patientFormState.errors.time = requiredValidator.validateRequiredField(patient.time);
    patientFormState.errors.specialty = requiredValidator.validateRequiredField(patient.specialty);
    patientFormState.errors.doctor = requiredValidator.validateRequiredField(patient.doctor);

    patientFormState.isValid = this.isFormValid(patientFormState.errors);

    return patientFormState;
  }

  private isFormValid = (errors: PatientFormErrors): boolean => {
    return Object.keys(errors).every((key) => {
      return errors[key].isValid;
    });
  }
}

const patientFormValidator = new PatientFormValidator();

export {
  patientFormValidator
}
```
