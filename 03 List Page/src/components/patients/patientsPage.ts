import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-patient></search-patient>
    </div>
  </div>
  `
})
class PatientsPage {

}

export {
  PatientsPage
}
