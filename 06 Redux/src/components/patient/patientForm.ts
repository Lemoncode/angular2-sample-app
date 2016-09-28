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
        <div class="col-sm-6 form-group" [class.has-error]="false">
          <label class="control-label" for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"
            value={{patientForm.patient.dni}}
            (input)="onChange($event)" />
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
              (click)="onSave($event, patient)">
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
  @Input() onInitializeForm: () => void;

  ngOnInit() {
    this.onInitializeForm();
  }
}

export {
  PatientForm
}
