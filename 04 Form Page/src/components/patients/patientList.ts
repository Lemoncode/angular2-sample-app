import { Component } from '@angular/core';
import { Patient } from '../../model/patient';
import { Promise } from 'core-js/es6';
import { PatientAPI } from '../../api/patientAPI';

@Component({
  selector: 'patient-list',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-offset-11 col-xs-1">
        <div class="pull-right">
          <span class="glyphicon glyphicon-plus-sign" [routerLink]="['/patient', 0]"></span>
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
              <span class="hidden-sm hidden-md hidden-lg pull-right glyphicon glyphicon-pencil"
                [routerLink]="['/patient']">
              </span>
            </td>
            <td class="hidden-xs hidden-sm hidden-md">{{p.doctor}}</td>
            <td class="hidden-xs">{{p.date}}</td>
            <td class="hidden-xs">
              {{p.time}}
              <span class="pull-right glyphicon glyphicon-pencil"
                [routerLink]="['/patient', p.id]">
              </span>
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

  constructor(patientAPI : PatientAPI) {
    patientAPI.getAllPatientsAsync().then((patients: Array<Patient>) => {
      this.patients = patients;
    });
  }
}

export {
  PatientList
}
