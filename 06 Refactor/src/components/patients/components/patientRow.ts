import { Component, Input } from "@angular/core";

import { Patient } from "../../../model/patient";

@Component({
  selector: "[patient-row]",
  template: `
      <td class="hidden-xs hidden-sm hidden-md">{{patient.dni}}</td>
      <td>{{patient.name}}</td>
      <td>
        {{patient.specialty}}
        <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
          [routerLink]="['/patient', patient.id]">
        </span>
      </td>
      <td class="hidden-xs hidden-sm hidden-md">{{patient.doctor}}</td>
      <td class="hidden-xs">{{patient.date}}</td>
      <td class="hidden-xs">
        {{patient.time}}
        <span class="pull-right glyphicon glyphicon-pencil"
          [routerLink]="['/patient', patient.id]">
        </span>
      </td>
  `
})
class PatientRow {
  @Input("patient-row") patient: Patient;
}

export {
  PatientRow
}
