import { Component } from '@angular/core';
import {PatientAPI} from '../api/patientAPI';

@Component(
  {
    selector: 'app',
    template: `
      <div class="container-fluid">
        <header></header>

        <router-outlet></router-outlet>
      </div>
    `,
    providers: [PatientAPI]
  }
)
class App {

}

export {
  App
}
