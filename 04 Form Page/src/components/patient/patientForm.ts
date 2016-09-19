import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Patient } from '../../model/patient';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      <form [formGroup]="patientForm" id="edit-patient-form"
        (ngSubmit)="save(patientForm.value)">
        <div class="col-xs-12 form-group">
          <label>Datos Paciente</label>
        </div>
        <div class="col-sm-6 form-group">
          <label for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            [formControl]="patientForm.controls['dni']"/>
        </div>
        <div class="col-sm-6 form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name"
            [formControl]="patientForm.controls['name']"/>
        </div>
        <div class="col-xs-12 form-group">
          <label>Datos Cita</label>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="date">Fecha</label>
          <input type="date" class="form-control" id="date"
            [formControl]="patientForm.controls['date']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="time">Hora</label>
          <input type="time" class="form-control" id="time"
            [formControl]="patientForm.controls['time']"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="specialty">Especialidad</label>
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
        
        <button type="submit" class="btn btn-success">Guardar</button>
      </form>
    </div>
  </div>
  `
})
class PatientForm implements OnChanges {
  @Input() specialties: Array<string>;
  @Input() doctors: Array<string>;
  @Input() patient: Patient;
  patientForm: FormGroup;

  constructor(formBuilder: FormBuilder) {    
    this.patient = new Patient();
    this.patientForm = formBuilder.group(this.patient);
  }

  ngOnChanges(changes) {
    let patient: SimpleChange = changes['patient'];

    if(patient.currentValue) {
      this.patientForm.setValue(patient.currentValue);
    }
  }

  save(value: any){
    let a = value;
  }
}

export {
  PatientForm
}
