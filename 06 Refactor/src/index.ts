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
