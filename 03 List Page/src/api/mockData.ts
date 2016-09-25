import { Patient } from '../model/patient';

const patientsMockData: Array<Patient> = [
  { id: 1, dni: "71258192Y", name: "John Doe", specialty: "Traumatología", doctor: "Karl J. Linville", date: "2019-09-19", time: "08:30" },
  { id: 2, dni: "98168530E", name: "Anna S. Batiste", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "2019-09-19", time: "09:00" },
  { id: 3, dni: "42955917J", name: "Octavia L. Hilton", specialty: "Traumatología", doctor: "Karl J. Linville", date: "2019-09-19", time: "09:30" },
  { id: 4, dni: "00706785H", name: "Tony M. Herrera", specialty: "Oftalmología", doctor: "Ruthie A. Nemeth", date: "2019-09-19", time: "10:00" },
  { id: 5, dni: "23754350L", name: "Robert J. Macias", specialty: "Cirugía", doctor: "Gladys C. Horton", date: "2019-09-19", time: "10:30" }
];

const specialtiesMockData: Array<string> = [
  "Cirugía",
  "Traumatología",
  "Oftalmología"
];

export {
  patientsMockData,
  specialtiesMockData
}
