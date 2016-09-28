import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Patient } from '../../model/patient';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientAPI } from '../../api/patientAPI';

@Component({
  selector: 'patient-form',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Appointment</h2>
      </div>
    </div>

    <div class="row">
      <form [formGroup]="patientForm" id="edit-patient-form">
        <div class="col-xs-12 form-group">
          <label>Patient Info</label>
        </div>
        <div class="col-sm-6 form-group">
          <label for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            [formControl]="patientForm.controls['dni']"/>
        </div>
        <div class="col-sm-6 form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name"
            [formControl]="patientForm.controls['name']"/>
        </div>
        <div class="col-xs-12 form-group">
          <label>Appointment Data</label>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="date">Date</label>
          <input type="date" class="form-control" id="date"
            [formControl]="patientForm.controls['date']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="time">Time</label>
          <input type="time" class="form-control" id="time"
            [formControl]="patientForm.controls['time']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="specialty">Specialty</label>
          <select id="specialty" class="form-control"
            [formControl]="patientForm.controls['specialty']">
            <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
          </select>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="doctor">Doctor</label>
          <select id="doctor" class="form-control"
            [formControl]="patientForm.controls['doctor']">
            <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
          </select>
        </div>

        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button type="button" (click)="savePatient($event, patientForm.value)" class="btn btn-success">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
class PatientForm implements OnChanges {
  @Input() specialties: Array<string>;
  @Input() doctors: Array<string>;
  @Input() patient: Patient;
  @Input() savePatient: (patient: Patient) => void;
  patientForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.patient = new Patient();
    this.patientForm = formBuilder.group(this.patient);
  }

  ngOnChanges(changes) {
    let patient: SimpleChange = changes['patient'];

    if(patient && patient.currentValue) {
      this.patientForm.setValue(patient.currentValue);
    }
  }
}

export {
  PatientForm
}
