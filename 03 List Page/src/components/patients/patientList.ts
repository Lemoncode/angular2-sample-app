import { Component } from '@angular/core';
import { Patient } from '../../model/patient';

@Component({
  selector: 'patient-list',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-offset-11 col-xs-1">
        <div class="pull-right">
          <span class="glyphicon glyphicon-plus-sign"></span>
        </div>
      </div>
    </div>
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
          <tr *ngFor="let p of patients">
            <td class="hidden-xs hidden-sm hidden-md">{{p.dni}}</td>
            <td>{{p.name}}</td>
            <td>
              {{p.specialty}}
              <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"></span>
            </td>
            <td class="hidden-xs hidden-sm hidden-md">{{p.doctor}}</td>
            <td class="hidden-xs">{{p.date}}</td>
            <td class="hidden-xs">
              {{p.time}}
              <span class="pull-right glyphicon glyphicon-pencil"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
class PatientList {
  patients: Array<Patient>;

  constructor() {
    this.patients = [
      { dni: "1234567A", name: "John Doe", specialty: "Traumatología", doctor: "Karl J. Linville", date: "19/09/2019", time: "08:30" },
      { dni: "5067254B", name: "Anna S. Batiste", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "19/09/2019", time: "09:00" },
      { dni: "1902045C", name: "Octavia L. Hilton", specialty: "Traumatología", doctor: "Karl J. Linville", date: "19/09/2019", time: "09:30" },
      { dni: "1880514D", name: "Tony M. Herrera", specialty: "Oftalmología", doctor: "Ruthie A. Nemeth", date: "19/09/2019", time: "10:00" },
      { dni: "6810774E", name: "Robert J. Macias", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "19/09/2019", time: "10:30" }
    ]
  }
}

export {
  PatientList
}
