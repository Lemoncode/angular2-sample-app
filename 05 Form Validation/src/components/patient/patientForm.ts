import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Patient } from '../../model/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patientAPI } from '../../api/patientAPI';
import { PatientFormValidator } from '../../validators/patientFormValidator';

@Component({
  selector: 'patient-form',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Editar Cita - Centro de Día</h2>
      </div>
    </div>

    <form [formGroup]="patientForm" id="edit-patient-form">
      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Datos Paciente</label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 form-group" [class.has-error]="patientForm.controls['dni'].dirty && patientForm.controls['dni'].invalid">
          <label class="control-label" for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            [formControl]="patientForm.controls['dni']"/>
          <span *ngIf="patientForm.controls['dni'].dirty && patientForm.controls['dni'].hasError('required')" class="help-block">Campo requerido.</span>
          <span *ngIf="patientForm.controls['dni'].dirty && patientForm.controls['dni'].hasError('dni.isValid')" class="help-block">DNI inválido.</span>
          <span *ngIf="patientForm.controls['dni'].dirty && patientForm.controls['dni'].hasError('dni.hasValidFormat')" class="help-block">Formato incorrecto.</span>
        </div>
        <div class="col-sm-6 form-group" [class.has-error]="patientForm.controls['name'].dirty && patientForm.controls['name'].invalid">
          <label class="control-label" for="name">Nombre</label>
          <input type="text" class="form-control" id="name"
            [formControl]="patientForm.controls['name']"/>
          <span *ngIf="patientForm.controls['name'].dirty && patientForm.controls['name'].hasError('required')" class="help-block">Campo requerido.</span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 form-group">
          <label>Datos Cita</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="patientForm.controls['date'].dirty && patientForm.controls['date'].invalid">
          <label class="control-label" for="date">Fecha</label>
          <input type="date" class="form-control" id="date"
            [formControl]="patientForm.controls['date']"/>
          <span *ngIf="patientForm.controls['date'].dirty && patientForm.controls['date'].hasError('required')" class="help-block">Campo requerido.</span>
        </div>
        <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="patientForm.controls['time'].dirty && patientForm.controls['time'].invalid">
          <label class="control-label" for="time">Hora</label>
          <input type="time" class="form-control" id="time"
            [formControl]="patientForm.controls['time']"/>
          <span *ngIf="patientForm.controls['time'].dirty && patientForm.controls['time'].hasError('required')" class="help-block">Campo requerido.</span>
        </div>

        <div class="row-md">
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="patientForm.controls['specialty'].dirty && patientForm.controls['specialty'].invalid">
            <label class="control-label" for="specialty">Especialidad</label>
            <select id="specialty" class="form-control"
              [formControl]="patientForm.controls['specialty']">
            <span *ngIf="patientForm.controls['specialty'].dirty && patientForm.controls['specialty'].hasError('required')" class="help-block">Campo requerido.</span>
              <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-3 form-group"  [class.has-error]="patientForm.controls['doctor'].dirty && patientForm.controls['doctor'].invalid">
            <label class="control-label" for="doctor">Doctor</label>
            <select id="doctor" class="form-control"
              [formControl]="patientForm.controls['doctor']">
            <span *ngIf="patientForm.controls['doctor'].dirty && patientForm.controls['doctor'].hasError('required')" class="help-block">Campo requerido.</span>
              <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
            </select>
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
              (click)="(!patientForm.dirty || patientForm.invalid) || savePatient($event, patientForm.value)"
              [class.disabled]="!patientForm.dirty || patientForm.invalid">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  `
})
class PatientForm implements OnChanges {
  @Input() specialties: Array<string>;
  @Input() doctors: Array<string>;
  @Input() patient: Patient;
  @Input() savePatient: (event: any, patient: Patient) => void;
  @Input() navigateBack: (event: any) => void;
  patientForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.patient = new Patient();
    this.patientForm = formBuilder.group(this.patient);

    let validator = new PatientFormValidator(this.patientForm);
    validator.setValidators();
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
