# 01 Hello Angular

In this sample we are going to setup the basic to work with Angular.

We will start from sample 00 Boilerplate.

Summary steps:
- Install dependencies
- Create App started component.

Let's ensure we have installed the previous sample dependencies

```
npm install
```

It's a good idea as well to install globally webpack and
typings:

```
npm install webpack -g
```

```
npm install typings -g
```

## Required dependencies
- *00 Boilerplate* dependencies
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

Let's install all them:

```
npm install @angular/common @angular/compiler
@angular/core @angular/platform-browser @angular/platform-browser-dynamic
core-js reflect-metadata
rxjs zone.js --save
```

And let's install typings for core-js

```
typings install dt~core-js --save --global
```

This will install most of the angular 2 typings.

And let's update wepback adding to the vendor zone the following
entries

```javascript
vendor: [
  "core-js",
  "reflect-metadata",
  "zone.js",
  "@angular/core",
  "@angular/platform-browser",
  "@angular/platform-browser-dynamic",
  "@angular/common",
  "@angular/compiler",
  "rxjs"
]
```
We need to specify this because some of them are not directly referenced in the application but are needed (indirect references)


# App component

Let's create a subfolder called _components_.

Under this subfolder we are going to create our main "container"
component, let's create a file called _app.ts_.

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
- **template**: We are defining our *template* string between [backticks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) this is a new feature of ES6 that allow us to do multiline strings (we could as well separate this into a separate HTML template).

## Configuration

In *index.ts* file we are going to create our first NgModule this is needed for booting our application.

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
so we have to use BrowserModule. We are going to add here our custom modules that our app needs.
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

Let's run the sample

```
npm start
```
