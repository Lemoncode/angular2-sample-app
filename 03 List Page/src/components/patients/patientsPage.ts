import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-patient class="col-sm-4 "></search-patient>
      <patient-list class="col-sm-8 "></patient-list>
    </div>
  </div>
  `
})
class PatientsPage {

}

export {
  PatientsPage
}
