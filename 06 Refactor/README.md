# 05 Form Validation
Let's get started working with validations.

In this demo will use Angular Validators and create custom validations.

We will start from sample **04 Form Page**.

Summary steps:
- Create custom DNI validations.
- Create custom DNI Validator.
- Create Patient Form Validator.
- Refactor Patient Form to show error messages.

## Required dependencies
- *04 Form Page* dependencies

# DNI Validations

We're going to create two custom validations:
- Valid DNI format.
- Valid DNI

## Definition:
### src/validations/dniValidation.ts

```
const hasValidFormat = (value: string): boolean => {
  const dniRegex = /^[0-9]{8}[a-z, A-Z]$/;

  return dniRegex.test(value);
}

const isValidDNI = (value: string): boolean => {
  let dniNumber: number = parseInt(value);
  let validLetter: string = getValidLetterByDNINumber(dniNumber);
  let currentLetter = value.charAt(8).toUpperCase();

  return currentLetter === validLetter;
};

let getValidLetterByDNINumber = (dniNumber: number) : string => {
  let letterIndex = dniNumber % 23;
  let validLetters = 'TRWAGMYFPDXBNJZSQVHLCKET';

  return validLetters.charAt(letterIndex)
};

export {
  hasValidFormat,
  isValidDNI
}
```

# DNI Validators

Angular 2 has default Validators like require, max-length, min-length, etc.
But we want to create a custom Validator associated to a FormControl for DNI

## Definition:
### src/validators/dniValidator.ts

```
import { FormControl } from '@angular/forms';
import { hasValidFormat, isValidDNI } from '../validations/dniValidation';

class DNIValidator {
  hasValidFormat(dniFormControl: FormControl): any {
    return hasValidFormat(dniFormControl.value) ?
      null :
      {
        "dni.hasValidFormat": {
          valid: false
        }
      }
  }

  isValid(dniFormControl: FormControl) {
    return isValidDNI(dniFormControl.value) ?
      null :
      {
        "dni.isValid": {
          valid: false
        }
      }
  }
}

const dniValidator = new DNIValidator();

export {
  dniValidator
}
```



# Patient Form Validator

We're going to set all validations for each patient form fields.
Here we are using Angular validators and custom DNI validators.

## Definition:
### src/Validators/patientFormValidator.ts

```
import { FormGroup, Validators } from '@angular/forms';
import { dniValidator } from './dniValidator';

class PatientFormValidator {
  constructor(private patientForm: FormGroup) {

  }

  setValidators() {
    this.setDNIValidators();
    this.setNameValidators();
    this.setDateValidators();
    this.setTimeValidators();
    this.setSpecialtyValidators();
    this.setDoctorValidators();
  }

  private setDNIValidators() {
    let dniFormControl = this.patientForm.controls['dni'];

    dniFormControl.setValidators([
      Validators.required,
      dniValidator.hasValidFormat,
      dniValidator.isValid
    ]);
  }

  private setNameValidators() {
    let nameFormControl = this.patientForm.controls['name'];

    nameFormControl.setValidators([
      Validators.required
    ]);
  }

  private setDateValidators() {
    let dateFormControl = this.patientForm.controls['date'];

    dateFormControl.setValidators([
      Validators.required
    ]);
  }

  private setTimeValidators() {
    let timeFormControl = this.patientForm.controls['time'];

    timeFormControl.setValidators([
      Validators.required
    ]);
  }

  private setSpecialtyValidators() {
    let specialtyFormControl = this.patientForm.controls['specialty'];

    specialtyFormControl.setValidators([
      Validators.required
    ]);
  }

  private setDoctorValidators() {
    let doctorFormControl = this.patientForm.controls['doctor'];

    doctorFormControl.setValidators([
      Validators.required
    ]);
  }
}

export {
  PatientFormValidator
}
```

# Patient Form

We can access to dirty, invalid, hasError... FormControl and/or FormGroup
properties and NgIf directive to show or hide error validations and disable save
button.

## Definition:
### src/components/patient/patientForm.ts

```
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
...

constructor(formBuilder: FormBuilder) {
  this.patient = new Patient();
  this.patientForm = formBuilder.group(this.patient);

  let validator = new PatientFormValidator(this.patientForm);
  validator.setValidators();
}
...
```
