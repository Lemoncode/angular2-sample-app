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
