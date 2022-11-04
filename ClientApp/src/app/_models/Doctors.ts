export class Doctors {
    doctorID: number;
    fullName: string;
    imagePath: string;
    fees:number;
    gender:string;
    email: string;
    skills: string;
    education: string;
    statusID: number;
    Times:TimeList[];
    Days:DoctorDaysList[];
    Specialities:selectedSpecialityList[];
}
export class DoctorDaysList {
    daysID: number;
    doctorID: number;
    specialistID: number;
    name:string;    
     
}
export class TimeList {
    TimeID: number;
    DaysID: number;
    DoctorID: number;
    SpecialistID:number;    
    TimeSlot:string;    
}
export class selectedSpecialityList {
    SpecialistID: number;
    Name: string;
    
}
