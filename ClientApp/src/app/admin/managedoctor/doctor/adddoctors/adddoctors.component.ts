import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { DoctorsService } from 'src/app/_services/doctors.service';
import { ToastService } from 'src/app/_services/toastservice';

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

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private doctorService: DoctorsService

  ) {
    this.createForm();
  }
  ngOnInit() {
    this.setSelectedDoctor();
  }

  get f() { return this.doctorForm.controls; }

  private createForm() {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      profile: ['', Validators.required],
      skills: ['', Validators.required],
      education: ['', Validators.required],
      statusID: [true],
      doctorID: 0,
    });
  }
  private editForm(obj) {
    debugger;
    this.f.firstName.setValue(obj.firstName);
    this.f.lastName.setValue(obj.lastName);
    this.f.fullName.setValue(obj.fullName);
    this.f.email.setValue(obj.email);
    this.f.profile.setValue(obj.profile);
    this.f.skills.setValue(obj.skills);
    this.f.doctorID.setValue(obj.doctorID);
    this.f.education.setValue(obj.education);
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);
  }
  setSelectedDoctor() {    
    this.route.paramMap.subscribe(param => {
      const sid = +param.get('id');
      if (sid) {
        this.loadingDoctor = true;
        this.f.doctorID.setValue(sid);
        this.doctorService.getById(sid, this.f.doctorID.value).subscribe(res => {
          //Set Forms
          this.editForm(res);
          this.loadingDoctor = false;
        });
      }
    })
  }
  onSubmit() {
    this.doctorForm.markAllAsTouched();
    this.submitted = true;
    if (this.doctorForm.invalid) { return; }
    this.loading = true;
    this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);

    if (parseInt(this.f.doctorID.value) === 0) {
      //Insert doctor
      console.log(JSON.stringify(this.doctorForm.value));
      this.doctorService.insert(this.doctorForm.value).subscribe(data => {
        if (data != 0) {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/managedoctor/doctor/adddoctors']);
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
          this.router.navigate(['/admin/managedoctor']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }



}

