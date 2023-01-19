export class Appointment {
  appointmentID: number;
  appointmentNo: string;
  patientName: string;
  fullName:string;
  address:string;
  email:string;
  mobile:string;
  age: string;
  gender: string;
  fees: string;
  appointmentType:string;
  day:string;
  bookingDate: string;  
  bookingDateNursing: string;  
  timeslot: string;
  testName: string;
  appointmentStatus: number;
  statusID: number;
  doctor: string;
  
  specialities: string;
}

export class AppointmentDetail {
  appointmentDetailID: number;
  appointmentID: number;
  medicalServiceID: number;
  fees: number;
  bookingDate: string;
  timeslot: string;
  description: string;
  statusID: number;
}
