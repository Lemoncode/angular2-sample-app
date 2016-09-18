import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { patientAPI } from '../../api/patientAPI';
import { Patient } from '../../model/patient';

@Component({
  selector: 'patient-page',
  template: `
  <div class="container-fluid well">
    <div class="row">
      <div class="col-xs-12">
        <h2>Editar Cita - Centro de Día</h2>
      </div>
    </div>

    <div class="row">
      <form id="edit-patient-form">
        <div class="col-xs-12 form-group">
          <label>Datos Paciente</label>
        </div>
        <div class="col-sm-6 form-group">
          <label for="dni">DNI</label>
          <input type="text" class="form-control" id="dni"/>
        </div>
        <div class="col-sm-6 form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name"/>
        </div>
        <div class="col-xs-12 form-group">
          <label>Datos Cita</label>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="date">Fecha</label>
          <input type="date" class="form-control" id="date"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="time">Hora</label>
          <input type="time" class="form-control" id="time"/>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="specialty">Especialidad</label>
          <select id="specialty" class="form-control">
            <option *ngFor="let s of specialties">{{s}}</option>
          </select>
        </div>
        <div class="col-md-6 col-lg-3 form-group">
          <label for="doctor">Doctor</label>
          <select id="doctor" class="form-control">
            <option *ngFor="let d of doctors">{{d}}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
  `
})
class PatientPage {
  specialties: Array<string>;
  doctors: Array<string>;
  patientId: number;
  patient: Patient;

  constructor(private route: ActivatedRoute) {
    this.loadRelatedCollections();

    route.params.subscribe(params => {
      this.patientId = params['id'];
    });
    this.loadPatient();
  }

  private loadRelatedCollections() {
    Promise.all([
      patientAPI.getAllSpecialtiesAsync(),
      patientAPI.getAllDoctorsAsync()
    ]).then((data) => {
      this.specialties = data[0];
      this.doctors = data[1];
    });
  }

  private loadPatient(){
    if (this.patientId && this.patientId > 0) {
      patientAPI.getPatientByIdAsync(this.patientId)
        .then((patient: Patient) => {
          this.patient = patient;
        });
    }
  }
}

export {
  PatientPage
}
