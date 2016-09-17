import { Routes } from '@angular/router';
import { LoginPage } from './components/login/loginPage';
import { PatientsPage } from './components/patients/patientsPage';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'patients', component: PatientsPage }
];

export {
  routes
}
