import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { PrescriptionService } from 'src/app/_services/prescription.service';
import { ToastService } from 'src/app/_services/toastservice';

@Component({
  selector: 'app-addprescriptions',
  templateUrl: './addprescription.component.html',
})
export class AddprescriptionComponent implements OnInit {
    submitted = false;
    prescriptionForm: FormGroup;
    loading = false;
    loadingPrescription = false;
    ButtonText = "Save";
    @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private prescriptionService: PrescriptionService

  ) {
    this.createForm();
  }
  ngOnInit() {
    this.setSelectedPrescription();
  }
  get f() { return this.prescriptionForm.controls; }
  private createForm() {
    this.prescriptionForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        mobile: ['', Validators.required],
        address: ['', Validators.required],
        note: ['', Validators.required],
        imagePath: [''],
        statusID: [true],
        prescriptionID: 0,
    });
}
  private editForm(obj) {
    debugger;
    this.f.customerName.setValue(obj.customerName);
    this.f.mobile.setValue(obj.mobile);
    this.f.address.setValue(obj.address);
    this.f.notes.setValue(obj.notes);
    this.f.prescriptionID.setValue(obj.prescriptionID);
    this.f.imagePath.setValue(obj.image);
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);
}
setSelectedPrescription() {
    this.route.paramMap.subscribe(param => {
      const sid = +param.get('id');
      if (sid) {
        this.loadingPrescription = true;
        this.f.prescriptionID.setValue(sid);
        this.prescriptionService.getById(sid).subscribe(res => {
          //Set Forms
          this.editForm(res);
          this.loadingPrescription = false;
        });
      }
    })
  }
  onSubmit() {
    this.prescriptionForm.markAllAsTouched();
    this.submitted = true;
    if (this.prescriptionForm.invalid) { return; }
    this.loading = true;
    this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
    this.f.imagePath.setValue(this.imgComp.imageUrl);

    if (parseInt(this.f.prescriptionID.value) === 0) {
      //Insert doctor
      console.log(JSON.stringify(this.prescriptionForm.value));
      this.prescriptionService.insert(this.prescriptionForm.value).subscribe(data => {
        if (data != 0) {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/pharmacy/prescription']);
        }
        this.loading = false;
      }, error => {
        this.ts.showError("Error", "Failed to insert record.")
        this.loading = false;
      });
    } else {
      //Update doctor
      this.prescriptionService.update(this.prescriptionForm.value).subscribe(data => {
        this.loading = false;
        if (data != 0) {
          this.ts.showSuccess("Success", "Record updated successfully.")
          this.router.navigate(['/admin/pharmacy/prescription']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }
}
