import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './components/app';
import { Header } from './components/common/header';

@NgModule({
  declarations: [
    App,
    Header
  ],
  imports: [BrowserModule],
  bootstrap: [App]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
