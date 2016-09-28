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
