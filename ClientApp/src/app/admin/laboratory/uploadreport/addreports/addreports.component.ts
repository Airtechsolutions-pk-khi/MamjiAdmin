import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { ToastService } from 'src/app/_services/toastservice';

@Component({
  selector: 'app-addreports',
  templateUrl: './addreports.component.html',
})
export class AddreportsComponent implements OnInit {
  submitted = false;
  reportForm: FormGroup;
  loading = false;
  loadingReport = false;
  ButtonText = "Save";
  CustomerList = [];
  selectedCustomerIds = [];

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private laboratoryService: LaboratoryService

  ) {
    this.createForm();
    this.loadCustomer();
  }

  ngOnInit() {
    this.setSelectedReport();
  }
  get f() { return this.reportForm.controls; }

  private createForm() {
    this.reportForm = this.formBuilder.group({
      labReferenceNo: ['', Validators.required],
      statusID: [true],
      customerID: 0,
      laboratoryID: [0],
      image: [''],
    });
  }
  private editForm(obj) {
    this.f.customerID.setValue(obj.customerID);
    this.f.labReferenceNo.setValue(obj.labReferenceNo);
    this.f.image.setValue(obj.image);
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);
    this.imgComp.imageUrl = obj.image;
  }
  setSelectedReport() {
    this.route.paramMap.subscribe(param => {
      const sid = +param.get('id');
      if (sid) {
        this.loadingReport = true;
        this.f.laboratoryID.setValue(sid);
        this.laboratoryService.getById(sid).subscribe(res => {
          //Set Forms
          this.editForm(res);
          this.loadingReport = false;
        });
      }
    })
  }
  onSubmit() {
    debugger
    this.reportForm.markAllAsTouched();
    this.submitted = true;
    if (this.reportForm.invalid) { return; }
    this.loading = true;
    this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
    this.f.image.setValue(this.imgComp.imageUrl);

    if (parseInt(this.f.laboratoryID.value) === 0) {
      //Insert customer
      console.log(JSON.stringify(this.reportForm.value));
      this.laboratoryService.insert(this.reportForm.value).subscribe(data => {
        if (data != 0) {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/laboratory/uploadreport']);
        }
        this.loading = false;
      }, error => {
        this.ts.showError("Error", "Failed to insert record.")
        this.loading = false;
      });
    } else {
      //Update customer
      this.laboratoryService.update(this.reportForm.value).subscribe(data => {
        this.loading = false;
        if (data != 0) {
          this.ts.showSuccess("Success", "Record updated successfully.")
          this.router.navigate(['/admin/laboratory/uploadreport']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }

  private loadCustomer() {
    this.laboratoryService.loadCustomer().subscribe((res: any) => {
      this.CustomerList = res;
    });
  }
}
