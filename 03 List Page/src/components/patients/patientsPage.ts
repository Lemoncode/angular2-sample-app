import { Component } from '@angular/core';

@Component({
  selector: 'patients-page',
  template: `
  <div class="container-fluid">
    <div class="row">
      <search-patient class="col-md-4"></search-patient>
      <patients-list class="col-md-8"></patients-list>
    </div>
  </div>
  `
})
class PatientsPage {

}

export {
  PatientsPage
}
