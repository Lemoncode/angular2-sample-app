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

### src/actions/doctors/loadDoctorsActions.ts
