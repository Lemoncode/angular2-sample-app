# 02 Navigation

Let's get started working with navigation.

In this demo will navigate from Login page to Patients list page.

We will start from sample **01 Hello Angular**.

Summary steps:
- Refactor App component.
- Create Header component
- Create Login component
- Create dummy Patients component
- Configure router.

## Required dependencies
- 01 Hello Angular dependencies
- @angular/router

## Styles dependencies
- bootstrap
- jquery

## Typings dependencies
- corje-js
- webpack-env

# App component

We are going to use Header component inside App component, so it will appear in all views from our application.

## Definition:
#### src/components/app.ts

```
import { Component } from '@angular/core';

@Component(
  {
    selector: 'app',
    template: `
      <div class="container-fluid">
        <header></header>
      </div>
    `
  }
)
class App {

}

export {
  App
}

```

# Header component

This is a navbar component.

## Definition:
### src/components/common/header.ts

```
import { Component } from '@angular/core';

@Component(
  {
    selector: 'header',
    template: `
      <div class="row">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">My App</a>
            </div>
          </div>
        </nav>
      </div>
    `
  }
)
class Header {

}

export {
  Header
}
```

## Configuration

Each component that we need to use, we have to include it in NgModule > declarations array.

### src/index.ts

```
...

import { Header } from './components/common/header';
...

@NgModule({
  declarations: [
    ...
    Header,
    ...
```

# Login component

This component is composed by two components: banner and login form.

## Definition:
### src/components/login/banner.ts

We need to require image url (using [webpack-env](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/webpack/webpack-env.d.ts) typings) and inject it into template via class property.

```
import { Component } from '@angular/core';
const imageSrc = require('../../images/health.png');

@Component({
  selector: 'banner',
  template: `
  <div class="row hidden-xs">
    <img src={{this.imageSrc}} class="img-responsive"/>
  </div>
  `
})
class Banner {
  imageSrc: any;

  constructor() {
    this.imageSrc = imageSrc;
  }
}

export {
  Banner
}
```

### src/components/login/loginForm.ts
Defining an horizontal form with two inputs and login button.

```
import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  template: `
    <div class="container-fluid">
      <div class="row">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="user" class="col-sm-2 col-lg-offset-2 control-label">Usuario</label>
            <div class="col-sm-9 col-lg-4">
              <input type="text" class="form-control" id="user"/>
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="col-sm-2 col-lg-offset-2 control-label">Password</label>
            <div class="col-sm-9 col-lg-4">
              <input type="password" class="form-control" id="password"/>
            </div>
          </div>
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

## Using components
### src/components/login/loginPage.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'login-page',
  template: `
  <div>
    <banner></banner>
    <login-form></login-form>
  </div>
  `
})
class LoginPage {

}

export {
  LoginPage
}
```

## Configuration
### src/index.ts
```
...

import { LoginPage } from './components/login/loginPage';
import { Banner } from './components/login/banner';
import { LoginForm } from './components/login/loginForm';
...

@NgModule({
  declarations: [
    ...
    LoginPage,
    Banner,
    LoginForm,
    ...
```

# Patients component

In next sample, this component will be a List of patients.

## Definition:
### src/components/patients/pagientsPage.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div>
    <h1>Lista de pacientes</h1>
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
...

@NgModule({
  declarations: [
    ...
    PatientsPage
    ...
```

# Router

We are going to use [@angular/router](https://www.npmjs.com/package/@angular/router) like routing library.

## Routes Definition
### src/routes.ts

We define three routes:
- **login**: to render Login component
- **patients**: to render Patients component
- **default route**: it redirects to login route.

```
import { Routes } from '@angular/router';
import { LoginPage } from './components/login/loginPage';
import { PatientsPage } from './components/patients/patientsPage';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'patients', component: PatientsPage }
];

export {
  routes
}
```

## Configuration
### src/index.ts

We are using RouterModule with routes defined previously.

In this case, we are using hash based paths strategy that the server understands as being the / path.

```
...

import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './routes';
...

@NgModule({
  ...
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [App],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
  ...
```

### src/components/app.ts

Using *router-outlet* element tells Angular to render components previously included
in **src/routes.ts**

```
...
template: `
  <div class="container-fluid">
    <header></header>

    <router-outlet></router-outlet>
  </div>
`
...
```

## Using routes
### src/components/common/header.ts

With [routerLink] tag, we can link defined routes.

```
...
<a class="navbar-brand" [routerLink]="['/login']">My App</a>
`
...
```

### src/components/login/loginForm.ts
```
...
<button class="btn btn-success" [routerLink]="['/patients']">Login</button>
`
...
```
