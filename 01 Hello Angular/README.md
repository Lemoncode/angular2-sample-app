# 01 Hello Angular

In this sample we are going to setup the basic to work with Angular.

We will start from sample 00 Boilerplate.

Summary steps:
- Install dependencies
- Create App started component.

## Required dependencies

- core-js
- reflect-metadata
- zone.js
- @angular/core
- @angular/platform-browser
- @angular/platform-browser-dynamic

## Peer dependencies

- @angular/common
- @angular/compiler
- rxjs

# App component

This is our started component, that is, it's like a "container" where we put other components.

## Definition
#### src/components/app.ts

```
import { Component } from '@angular/core';

@Component(
  {
    selector: 'app',
    template: `
      <h1>01 Hello angular</h1>
    `
  }
)
class App {

}

export {
  App
}
```

- **selector**: This property is used to define how to call this component from HTML.
- **template**: We are defining our *template* string between [backticks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) this is a new feature of ES6 that allow us to do multiline strings.

## Configuration

In *index.ts* file we are going to create our first NgModule necessary for booting our application.

#### src/index.ts
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './components/app';

@NgModule({
  declarations: [App],
  imports: [BrowserModule],
  bootstrap: [App]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
```

- **declarations**: defines which components we are going to use in this module. In this case App component.
- **imports**: describes which *dependencies* this module has. In this case, we are going to create a browser app,
so we have to use BrowserModule. There are other dependencies like ServerModule, etc.
- **bootstrap**: this property tells Angular to load, in this case, App component as the top-level component.

The last line `platformBrowserDynamic().bootstrapModule(AppModule)` initialize the browser platform to runs AppModule application.

## Using App Component
### src/index.html

We use *app* selector, that we defined previously.
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Angular 2 Sample App</title>
  </head>
  <body>
    <div>
        <app>
          Loading...
        </app>
    </div>
  </body>
</html>
```
