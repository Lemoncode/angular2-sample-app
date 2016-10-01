import { Component, Input } from "@angular/core";

import { Patient } from "../../../model/patient";
import { PatientRow } from "./patientRow";

@Component({
  selector: "patient-list-table",
  template: `
    <div class="row">
      <table class="col-xs-12 table table-striped table-bordered">
        <thead>
          <tr>
            <th class="hidden-xs hidden-sm hidden-md">DNI</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th class="hidden-xs hidden-sm hidden-md">Doctor</th>
            <th class="hidden-xs">Cita</th>
            <th class="hidden-xs">Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of patients" [patient-row]="p"></tr>
        </tbody>
      </table>
    </div>
  `
})
class PatientListTable {
  @Input() patients: Array<Patient>;
}

export {
  PatientListTable
}
