import { Component } from '@angular/core';

@Component({
  selector: 'search-patient',
  template: `
  <div class="col-sm-4 well">
    <div class="row">
      <div class="col-xs-12">
        <span class="col-xs-1 glyphicon glyphicon-search"></span>
        <p class="col-xs-10">Buscar paciente</p>
      </div>
      <form>
        <div class="col-xs-6 form-group">
          <label for="date">Fecha</label>
          <input type="date" class="form-control" id="date"/>
        </div>
        <div class="col-xs-6 form-group">
          <label for="time">Hora</label>
          <input type="time" class="form-control" id="time"/>
        </div>
        <div class="col-xs-12 form-group">
          <select class="form-control">
            <option *ngFor="let s of specialties">{{s}}</option>
          </select>
        </div>
        <div class="col-xs-12 form-group">
          <label for="doctor">Doctor</label>
          <input type="text" class="form-control" id="doctor"/>
        </div>
        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button class="btn btn-primary">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
class SearchPatient {
  specialties: Array<string>;

  constructor() {
    this.specialties = [
      "Cirugía",
      "Traumatología",
      "Oftalmología"
    ]
  }
}

export {
  SearchPatient
}
