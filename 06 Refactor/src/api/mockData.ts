import { Patient } from '../model/patient';
const patientsMockData: Array<Patient> = [
  { id: 1, dni: "1234567A", name: "John Doe", specialty: "Traumatology", doctor: "Karl J. Linville", date: "2019-09-19", time: "08:30" },
  { id: 2, dni: "5067254B", name: "Anna S. Batiste", specialty: "Surgery", doctor: "Gladys C. Horton", date: "2019-09-19", time: "09:00" },
  { id: 3, dni: "1902045C", name: "Octavia L. Hilton", specialty: "Traumatology", doctor: "Karl J. Linville", date: "2019-09-19", time: "09:30" },
  { id: 4, dni: "1880514D", name: "Tony M. Herrera", specialty: "Ophthalmology", doctor: "Ruthie A. Nemeth", date: "2019-09-19", time: "10:00" },
  { id: 5, dni: "6810774E", name: "Robert J. Macias", specialty: "Surgery", doctor: "Gladys C. Horton", date: "2019-09-19", time: "10:30" }
];

const specialtiesMockData: Array<string> = [
  "Surgery",
  "Traumatology",
  "Ophthalmology"
];

const doctorsMockData: Array<string> = [
  "Karl J. Linville",
  "Gladys C. Horton",
  "Ruthie A. Nemeth"
];

export {
  patientsMockData,
  specialtiesMockData,
  doctorsMockData
}
