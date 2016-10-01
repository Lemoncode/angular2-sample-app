import { Component } from "@angular/core";

@Component({
  selector: "patient-button-add",
  template: `
    <div class="row">
      <div class="col-xs-offset-11 col-xs-1">
        <div class="pull-right">
          <span class="glyphicon glyphicon-plus-sign" [routerLink]="['/patient', 0]"></span>
        </div>
      </div>
    </div>
  `
})
class PatientButtonAdd {
}

export {
  PatientButtonAdd
}
