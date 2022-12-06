export class Doctors {
    doctorID: number;
    fullName: string;
    imagePath: string;    
    gender:string;
    email: string;
    skills: string;
    education: string;
    profile:string;
    statusID: number;
    
    doctorSchedule:DoctorSchedule[];
    doctorProfiles:DoctorProfiles[];
}
export class DoctorProfiles {     
    fees:number;    
    profile:string;    
}
export class DoctorSchedule {
     
    name: string;
    dayName:string;
    timeSlot:string;
}
