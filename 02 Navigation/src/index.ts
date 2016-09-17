import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './components/app';
import { Header } from './components/common/header';
import { Banner } from './components/login/banner';
import { LoginPage } from './components/login/loginPage';

@NgModule({
  declarations: [
    App,
    Header,
    Banner,
    LoginPage
  ],
  imports: [BrowserModule],
  bootstrap: [App]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
