import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LoginPage} from './loginPage';
import {Banner} from './components/banner';
import {LoginForm} from './components/loginForm';
import {LoginField} from './components/loginField'
import {LoginButton} from './components/loginButton';

@NgModule({
  declarations: [
    LoginPage,
    Banner,
    LoginForm,
    LoginField,
    LoginButton
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
