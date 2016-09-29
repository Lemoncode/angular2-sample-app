# 06 Refactor

We have manage to complete our sample app, but things can be enhanced, in this
iteration we are going to apply some refactoring in order to make the app more
readable and maintanble.

We will start from sample **05 Form Validation**.

Summary steps:
- Encapsulate pages + subcomponent into a NgModules + index.js.
- Make shorter HTML templates (break into subcomponents), sample: loginform.
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
### src/components/login/index.ts

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
### src/index.ts

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
### src/index.ts

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

# Simplify HTML components

Lets start by checking how can we improve the login module, bad smells that we can find:

    - Its not clear which components are ham (loginPage) and which ones are just private
    or minor subcomponents, it would be a good idea to create a subfolder on the login
    area called 'components' and keep at root level just the page and the index.

    - LoginForm HTML template is too big we should abstract detailed HTML into simpler
    components that could let us understand the template content just by reading
    it in one go.


## Folder refactoring

We are going to create a subfolder under _src/components/login_ called _components_
and move there _banner.ts_, _loginForm.ts_

## Banner:
### src/components/login/components/banner.ts


Banner component is consuming an image via require we have to update the path
of that picture

```javascript
const imageSrc = require('../../../images/health.png');
```

## Login Module:
### src/components/login/index.ts



Once we have done this, we have to fix the references in the login module definition

```javascript
import {Banner} from './components/banner';
import {LoginForm} from './components/loginForm';
```

## Simplify LoginForm template

Login form HTML contains a lot of HTML jargon, its hard to understand what
is this form for just by reading the template. To simplify this we are going
to create a subcomponent called loginField under this component we are going
to implement all the label / input details. This dialog is just dummy, if it
could contain information, we would add value as input variable the
value to be binded and expose a callback for the update (we will do this in patient form).


## LoginField component:
### src/components/login/components/loginField.ts


```
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';


@Component({
  selector: 'login-field',

  template: `
          <div class="form-group">
            <label class="col-sm-2 col-lg-offset-2 control-label">{{caption}}</label>
            <div class="col-sm-9 col-lg-4">
              <input type="text" class="form-control" [id]="fieldId"/>
            </div>
          </div>
  `
})
class LoginField {
  @Input() caption: string;
  @Input() fieldId : string;
}

export {
  LoginField
}
```

## Login module:
### src/components/login/index.ts

Let's register the component

```javascript
declarations: [
  LoginPage,
  Banner,
  LoginForm,
  LoginField
],
```

## Login form:
### src/components/login/components/loginForm.ts

Let's refactor the login form template (html)


```
import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
    <div class="container-fluid">
      <div class="row">
        <form class="form-horizontal">
          <login-field [caption]="'user'" [fieldId]="'user'"></login-field>
          <login-field [caption]="'password'" [fieldId]="'password'"></login-field>
          <div class="form-group">
            <div class="col-sm-1 col-sm-offset-2 col-lg-offset-4">
              <button class="btn btn-success" [routerLink]="['/patients']">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
class LoginForm {
}

export {
  LoginForm
}
```

## LoginButton component:
### src/components/login/components/loginButton.ts

Let's do a similar thing with the login button

```javascript
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';


@Component({
  selector: 'login-button',

  template: `
      <div class="form-group">
        <div class="col-sm-1 col-sm-offset-2 col-lg-offset-4">
          <button class="btn btn-success" [routerLink]="[navigationLink]">Login</button>
        </div>
      </div>
  `
})
class LoginButton {
  @Input() navigationLink: string;
}

export {
  LoginButton
}
```

## Login module:
### src/components/login/index.ts

Let's register the component

```
import {LoginButton} from './components/loginButton';
...
declarations: [
  ...
  LoginButton
],
```

## Login form:
### src/components/login/components/loginForm.ts

Let's refactor the login form template (html)

template: `
  <div class="container-fluid">
    <div class="row">
      <form class="form-horizontal">
        <login-field [caption]="'user'" [fieldId]="'user'"></login-field>
        <login-field [caption]="'password'" [fieldId]="'password'"></login-field>
        <login-button [navigationLink]="navigationLink"></login-button>
      </form>
    </div>
  </div>
`

#Ideas

##PatientList

What could we do to enhance PatientList? Idea Pseudocode

```html
<patient-header></patientheader>
<patient-body></patient-body>
```

and inside patient-body:

```html
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
          <patient-row [patient] ="p"/>
      </tr>
    </tbody>
  </table>

```

Patient-row should just take care of displaying a single row based on a given patient
