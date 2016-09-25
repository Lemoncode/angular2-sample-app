import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-patient-container class="col-md-4"></search-patient-container>
      <patient-list-container class="col-md-8"></patient-list-container>
    </div>
  </div>
  `
})
class PatientsPage {

}

export {
  PatientsPage
}
