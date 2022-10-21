import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { ToastService } from 'src/app/_services/toastservice';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addappointment',
  templateUrl: './addappointment.component.html',

})
export class AddappointmentComponent implements OnInit {
  submitted = false;
  appointmentForm: FormGroup;
  loading = false;
  loadingAppointment = false;
  ButtonText = "Save";
  DoctorList = [];
  selectedDoctorIds: string[];
  DoctorDaysList =[];
  selectedDaysID =[];
  SpecialityList = [];
  drpSpecialityList = [];
  selectedSpecialityList = [];
  selectedSpecialistIds: string[];
 
  drpDayList = [];

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private appointmentService: AppointmentService

  ) {
    this.createForm();

    this.loadDoctor();
    this.loadDay();
    this.loadSpecialitiesAll();
  }
  ngOnInit() {
    this.setSelectedAppointment();
  }

  get f() { return this.appointmentForm.controls; }

  private createForm() {
    this.appointmentForm = this.formBuilder.group({
      appointmentNo: ['', Validators.required],
      patientName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      fees: ['', Validators.required],
      bookingDate: ['', Validators.required],
      DoctorDaysList: [],
      
      timeslot: ['', Validators.required],
      appointmentStatus: [''],
      statusID: [true],
      appointmentID: 0,
      doctorID: '',
      customerID: '',
      specialityID: '',
      daysID: '',
      fullname: ['', Validators.required],
    });
  }
  private editForm(obj) {
    this.f.patientName.setValue(obj.patientName);
    this.f.age.setValue(obj.age);
    this.f.gender.setValue(obj.gender);
    this.f.fees.setValue(obj.fees);
    this.f.bookingDate.setValue(obj.bookingDate);
    this.f.day.setValue(obj.day);
    this.f.appointmentID.setValue(obj.appointmentID);
    this.f.timeslot.setValue(obj.timeslot);
    this.f.appointmentNo.setValue(obj.appointmentNo);
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);

    if (obj.doctorID != "") {
      var stringToConvert = obj.doctor;
      this.selectedDoctorIds = stringToConvert.split(',').map(Number);
      this.f.doctorID.setValue(obj.doctor);
    }

    if (obj.specialities != "") {
      var stringToConvert = obj.specialities;
      this.selectedSpecialistIds = stringToConvert.split(',').map(Number);
      this.f.specialities.setValue(obj.specialities);
    }
  }
  setSelectedAppointment() {
    this.route.paramMap.subscribe(param => {
      const sid = +param.get('id');
      if (sid) {
        this.loadingAppointment = true;
        this.f.appointmentID.setValue(sid);
        this.appointmentService.getById(sid).subscribe(res => {
          //Set Forms
          this.editForm(res);
          this.loadingAppointment = false;
        });
      }
    })
  }

  onSubmit() {
    this.appointmentForm.markAllAsTouched();
    this.submitted = true;
    if (this.appointmentForm.invalid) { return; }
    this.loading = true;
    this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);

    if (parseInt(this.f.appointmentID.value) === 0) {
      console.log(JSON.stringify(this.appointmentForm.value));
      this.appointmentService.insert(this.appointmentForm.value).subscribe(data => {
        if (data != 0) {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/reception/appointment']);
        }
        this.loading = false;
      }, error => {
        this.ts.showError("Error", "Failed to insert record.")
        this.loading = false;
      });
    } else {
      //Update doctor
      this.appointmentService.update(this.appointmentForm.value).subscribe(data => {
        this.loading = false;
        if (data != 0) {
          this.ts.showSuccess("Success", "Record updated successfully.")
          this.router.navigate(['/admin/reception/appointment']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }
  private loadDoctor() {    
    this.appointmentService.loadDoctor().subscribe((res: any) => {
      this.DoctorList = res;
    });
  }
  loadSpecialities() {
   debugger
    this.appointmentService.loadSpecialities().subscribe((res: any) => {
      this.SpecialityList = res;
    });
  }
  loadSpecialitiesAll() {
    debugger
     this.appointmentService.loadSpecialities().subscribe((res: any) => {
       this.selectedSpecialityList = res;
     });
   }
  loadDay() {
    debugger
    this.appointmentService.loadDay().subscribe((res: any) => {
      this.DoctorDaysList = res;
    });
  }
  selectedSpeciality(id) {
    debugger
    this.drpSpecialityList = this.SpecialityList.filter(x => x.DoctorID == id);
    this.f.doctorID.setValue(id);
    //enable the drp down
  }
  selectedDay(id) {
    this.drpDayList = this.DoctorDaysList.filter(x => x.SpecialityID == id);
    this.f.specialityID.setValue(id);
    //enable the drp down
  }
  selectedTime(id) {
    this.f.dayID.setValue(id);
    //enable the drp down
  }
  onChange(DoctorList) {
    console.log(this.drpSpecialityList);
  }
}
