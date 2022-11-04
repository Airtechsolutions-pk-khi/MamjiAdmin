import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { DoctorsService } from 'src/app/_services/doctors.service';
import { ToastService } from 'src/app/_services/toastservice';
import { AppointmentService } from 'src/app/_services/appointment.service';

@Component({
  selector: 'app-adddoctors',
  templateUrl: './adddoctors.component.html',

})
export class AdddoctorsComponent implements OnInit {
  submitted = false;
  doctorForm: FormGroup;
  loading = false;
  loadingDoctor = false;
  ButtonText = "Save"; selectedCityIds
  selectedSubCategoriesIds: string[];
  selectedLocationIds: string[];
  selectedgroupModifierIds: string[];
  DoctorDaysDetailList = [];
  selectedSpecialityList=[];
  selectedSpecialistIds=[];
  DoctorDaysList=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturdey','Sunday'];
  TimeList=['10:00 AM - 11:00 AM','11:00 AM - 12:00 PM','12:00 PM - 01:00 PM','01:00 PM - 02:00 PM']
  selectedDaysID=[];
  selectedTimeslot=[];

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private doctorService: DoctorsService,
    private appointmentService: AppointmentService

  ) {
    this.createForm();
    // this.loadDay();
    this.loadSpecialitiesAll();
  }
  ngOnInit() {
    this.setSelectedDoctor();
  }

  get f() { return this.doctorForm.controls; }

  private createForm() {
    this.doctorForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      fullName: ['', Validators.required],
      email: ['', Validators.required],      
      skills: ['', Validators.required],
      education: ['', Validators.required],
      imagePath: [''],
      statusID: [true],
      fees:[0],
      gender:[''],
      timeslot:[''],
      doctorID:[0],

      specialities:[],
      days:[],
      times:[],

      
       
    });
  }
  private editForm(obj) {
    debugger;
    this.selectedSpecialityList = obj.doctorSpeciality;
    this.DoctorDaysDetailList = obj.DaysDetail;
    this.selectedTimeslot = obj.times;
    this.f.firstName.setValue(obj.firstName);
    this.f.lastName.setValue(obj.lastName);
    this.f.fullName.setValue(obj.fullName);
    this.f.email.setValue(obj.email);
    this.f.profile.setValue(obj.profile);
    this.f.skills.setValue(obj.skills);
    this.f.doctorID.setValue(obj.doctorID);
    this.f.imagePath.setValue(obj.image);
    this.f.education.setValue(obj.education);
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);
  }
  setSelectedDoctor() {
    this.route.paramMap.subscribe(param => {
      const sid = +param.get('id');
      if (sid) {
        this.loadingDoctor = true;
        this.f.doctorID.setValue(sid);
        this.doctorService.getById(sid).subscribe(res => {
          //Set Forms
          this.editForm(res);
          this.loadingDoctor = false;
        });
      }
    })
  }

  loadSpecialitiesAll() {
    debugger
     this.appointmentService.loadSpecialities().subscribe((res: any) => {
       this.selectedSpecialityList = res;
     });
   }
  // loadDay() {
  //   debugger
  //   this.appointmentService.loadDay().subscribe((res: any) => {
  //     this.DoctorDaysList = res;
  //   });
  // }

  onSubmit() {
    debugger
    this.doctorForm.markAllAsTouched();
    this.submitted = true;
    if (this.doctorForm.invalid) { return; }
    this.loading = true;

    this.f.specialities.setValue(this.selectedSpecialistIds == undefined ? "" : this.selectedSpecialistIds.toString());
    
    // this.f.days.setValue(this.selectedDaysID == undefined ? "" : this.selectedDaysID.toString());
    this.f.days.setValue(this.selectedDaysID);
     this.f.times.setValue(this.selectedTimeslot == undefined ? "" : this.selectedTimeslot.toString());
    
    this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
    this.f.imagePath.setValue(this.imgComp.imageUrl);

    if (parseInt(this.f.doctorID.value) === 0) {
      //Insert doctor
      console.log(JSON.stringify(this.doctorForm.value));
      this.doctorService.insert(this.doctorForm.value).subscribe(data => {
        if (data != 0) {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/doctor']);
        }
        this.loading = false;
      }, error => {
        this.ts.showError("Error", "Failed to insert record.")
        this.loading = false;
      });
    } else {
      //Update doctor
      this.doctorService.update(this.doctorForm.value).subscribe(data => {
        this.loading = false;
        if (data != 0) {
          this.ts.showSuccess("Success", "Record updated successfully.")
          this.router.navigate(['/admin/managedoctor/doctor']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }

  RemoveChild(obj) {
    // const index = this.OrderDetailList.indexOf(obj);
    // this.OrderDetailList.splice(index, 1);
  }
  AddChild(val) {
   debugger
    var obj = this.selectedSpecialityList.find(element => element.doctorSpeciality == val.doctorSpeciality);
     
     if (val.specialistID != null) {
       if (!this.selectedSpecialityList.find(element => element.name == val.name)) {
         this.selectedSpecialityList.push({
           name: obj.name,
           
         });
       }
       else {
         alert("Item already added in list")
       }
       //this.clear();
     }
   }
  
  }

 
