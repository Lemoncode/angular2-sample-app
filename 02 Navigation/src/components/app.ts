import { Component } from '@angular/core';
const imageSrc = require('../images/health.png');

@Component(
  {
    selector: 'app',
    template: `
      <div class="container-fluid">
        <header></header>
        <img src={{this.imageSrc}} class="img-responsive"/>
        <login></login>
      </div>
    `
  }
)
class App {
  imageSrc: any;

  constructor() {
    this.imageSrc = imageSrc;
  }
}

export {
  App
}
