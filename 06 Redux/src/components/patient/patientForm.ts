import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../model/patient';
import { PatientFormState } from '../../states/patientFormState';

@Component({
  selector: 'patient-form',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Editar Cita - Centro de Día</h2>
      </div>
    </div>

    <form id="edit-patient-form">
      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Datos Paciente</label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 form-group" [class.has-error]="!patientForm.errors.dni.isValid">
          <label class="control-label" for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            value={{patientForm.patient.dni}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.dni.isValid" class="help-block">{{patientForm.errors.dni.errorMessage}}</span>
        </div>
        <div class="col-sm-6 form-group" [class.has-error]="!patientForm.errors.name.isValid">
          <label class="control-label" for="name">Name</label>
          <input type="text" class="form-control" id="name"
            value={{patientForm.patient.name}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.name.isValid" class="help-block">{{patientForm.errors.name.errorMessage}}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Datos Cita</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.date.isValid">
          <label class="control-label" for="date">Date</label>
          <input type="date" class="form-control" id="date"
            value={{patientForm.patient.date}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.date.isValid" class="help-block">{{patientForm.errors.date.errorMessage}}</span>
        </div>
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.time.isValid">
          <label class="control-label" for="time">Time</label>
          <input type="time" class="form-control" id="time"
            value={{patientForm.patient.time}}
            (input)="onChange($event)"/>
          <span *ngIf="!patientForm.errors.time.isValid" class="help-block">{{patientForm.errors.time.errorMessage}}</span>
        </div>
        <div class="row-md">
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.specialty.isValid">
            <label class="control-label" for="specialty">Specialty</label>
            <select id="specialty" class="form-control"
              value={{patientForm.patient.specialty}}
              (change)="onChange($event)">
              <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
            </select>
            <span *ngIf="!patientForm.errors.specialty.isValid" class="help-block">{{patientForm.errors.specialty.errorMessage}}</span>
          </div>
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="!patientForm.errors.doctor.isValid">
            <label class="control-label" for="doctor">Doctor</label>
            <select id="doctor" class="form-control"
              value={{patientForm.patient.doctor}}
              (change)="onChange($event)">
              <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
            </select>
            <span *ngIf="!patientForm.errors.doctor.isValid" class="help-block">{{patientForm.errors.doctor.errorMessage}}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-2 form-group">
          <div>
            <button type="button" class="btn btn-primary"
              (click)="navigateBack($event)">
              Volver
            </button>
          </div>
        </div>
        <div class="col-xs-offset-8 col-xs-2 form-group">
          <div class="pull-right">
            <button type="button" class="btn btn-success"
              (click)="!patientForm.isValid || onSave($event, patientForm.patient)"
              [class.disabled]="!patientForm.isValid">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  `
})
class PatientForm implements OnInit {
  @Input() specialties: Array<string>;
  @Input() doctors: Array<string>;
  @Input() patientForm: PatientFormState;
  @Input() onSave: (event: any, patient: Patient) => void;
  @Input() navigateBack: (event: any) => void;
  @Input() onChange: (event: any) => void;

  ngOnInit() {
    this.patientForm = new PatientFormState();
  }
}

export {
  PatientForm
}
