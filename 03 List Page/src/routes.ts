import { Routes } from '@angular/router';
import { LoginPage } from './components/login/loginPage';
import { PatientsPage } from './components/patients/patientsPage';
import { PatientPage } from './components/patient/patientPage';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'patients', component: PatientsPage },
  { path: 'patient', component: PatientPage }
];

export {
  routes
}
