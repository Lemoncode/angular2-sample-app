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
