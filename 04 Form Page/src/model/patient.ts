export class Patient {
  id: number;
  dni: string;
  name: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;

  constructor() {
    this.id = 0;
    this.dni = "";
    this.name = "";
    this.specialty = "";
    this.doctor = "";
    this.date = "";
    this.time = "";
  }
}
