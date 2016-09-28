# 05 Form Validation

We have manage to complete our sample app, but things can be enhanced, in this
iteration we are going to apply some refactoring in order to make the app more
readable and maintanble.

We will start from sample **05 Form Validation**.

Summary steps:
- Encapsulate pages + subcomponent into a NgModules + index.js.
- Make shorter the component HTML (break into subcomponents), sample: loginform.
- Extract the HTML template into a separate file.

- Use of ng-message like for error messaging.

# NgModules
## Login Form

The index.ts file is starting to getting polluted by a lot of single component
declaration (imports), if the app keeps on growing this file could keep growing
(bad smell).

Let's create a Module per page (each page is broken down into subcomponents),
by doing this we will simplify main module definition.

## Shared Module definition:
### src/login/index.ts

We will create a module that will compile all the subcomponents related with the login form.

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LoginPage} from './loginPage';
import {Banner} from './banner';
import {LoginForm} from './loginForm';

@NgModule({
  declarations: [
    LoginPage,
    Banner,
    LoginForm,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class LoginModule {

}
```
## App Module:
### src/app.ts

Let's remove the references to the login components, and add a dependency to the login form.

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { App } from './components/app';
import { Header } from './components/common/header';

import { LoginModule} from './components/login/';

import { PatientsPage } from './components/patients/patientsPage';
import { SearchPatient } from './components/patients/searchPatient';
import { PatientList } from './components/patients/patientList';
import { PatientPage } from './components/patient/patientPage';
import { PatientForm } from './components/patient/patientForm';

@NgModule({
  declarations: [
    App,
    Header,
    PatientsPage,
    SearchPatient,
    PatientList,
    PatientPage,
    PatientForm
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    LoginModule
  ],
  bootstrap: [App],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
```

Now let's check that the app is still running as expected.

```
npm start
```

## API Module

LoginForm was an isolated module (no interaction with services), let's jump into something more complex: we want to create a new module for the patients page but it has dependencies on some services. Prior to create the patients module we are going to create an isolated api module.

## Shared Module definition:
### src/api/index.ts

Let's start by creating the API module:

```javascript
import { NgModule } from '@angular/core';
import {PatientAPI} from './patientAPI';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    PatientAPI
  ]
})
export class APIModule {

}
```

## Shared Module definition:
### src/components/app.ts

Now let's remove the patientAPI dependency on the main application (app.ts)

```javascript
import { Component } from '@angular/core';

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
class App {

}

export {
  App
}
````

## Patients Module

## Shared Module definition:
### src/components/patients/index.ts

Now that lets jump into patients module and create the index
(including the reference to the API module).

```javascript
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
```

## Main Module:
### src/components/index.ts

Lets include it into the index.ts module and remove the references to
patients components.

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { App } from './components/app';
import { Header } from './components/common/header';

import { LoginModule } from './components/login/';
import { PatientsModule } from './components/patients/';

import { PatientPage } from './components/patient/patientPage';
import { PatientForm } from './components/patient/patientForm';

@NgModule({
  declarations: [
    App,
    Header,
    PatientPage,
    PatientForm
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    PatientsModule
  ],
  bootstrap: [App],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)

```


## Patient Module

Lets do the same with Patient Module.

## Shared Module definition:
### src/components/patient/index.ts

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {APIModule} from '../../api/';

import {PatientForm} from './patientForm';
import {PatientPage} from './patientPage';

@NgModule({
  declarations: [
    PatientForm,
    PatientPage
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,    
    APIModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class PatientModule {

}
```

## Main Module:
### src/index.ts

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { App } from './components/app';
import { Header } from './components/common/header';

import { LoginModule } from './components/login/';
import { PatientsModule } from './components/patients/';
import { PatientModule }  from './components/patient/';

@NgModule({
  declarations: [
    App,
    Header,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    PatientsModule,
    PatientModule
  ],
  bootstrap: [App],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
```
