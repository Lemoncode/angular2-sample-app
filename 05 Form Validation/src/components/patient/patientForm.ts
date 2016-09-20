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

    <div class="row">
      <form [formGroup]="patientForm" id="edit-patient-form">
        <div class="col-xs-12 form-group">
          <label>Datos Paciente</label>
        </div>
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
        <div class="col-xs-12 form-group">
          <label>Datos Cita</label>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label class="control-label" for="date">Fecha</label>
          <input type="date" class="form-control" id="date"
            [formControl]="patientForm.controls['date']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label class="control-label" for="time">Hora</label>
          <input type="time" class="form-control" id="time"
            [formControl]="patientForm.controls['time']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label class="control-label" for="specialty">Especialidad</label>
          <select id="specialty" class="form-control"
            [formControl]="patientForm.controls['specialty']">
            <option *ngFor="let s of specialties" [value]="s">{{s}}</option>
          </select>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label class="control-label" for="doctor">Doctor</label>
          <select id="doctor" class="form-control"
            [formControl]="patientForm.controls['doctor']">
            <option *ngFor="let d of doctors" [value]="d">{{d}}</option>
          </select>
        </div>

        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button type="button" class="btn btn-success"
              (click)="(!patientForm.dirty || patientForm.invalid) || savePatient($event, patientForm.value)"
              [class.disabled]="!patientForm.dirty || patientForm.invalid">
              Guardar
            </button>
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
