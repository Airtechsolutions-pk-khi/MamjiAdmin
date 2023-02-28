import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { ToastService } from 'src/app/_services/toastservice';
import { DiagnosticCategories } from '../../../../_models/DiagnosticCategories';
import { DiagnosticCategoryService } from '../../../../_services/diagnosticcategories.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

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
  CategoryList = [];
  selectedCustomerIds = [];
  selectedCategoryIds = [];
  Images = [];
  pdfFile;
  pdfSrc;
  pdfBufferRender;
  localPDF;


  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private laboratoryService: LaboratoryService,
    private diagnosticcategoriesService: DiagnosticCategoryService

  ) {
    this.createForm();
    this.loadCustomer();
    this.loadCategories();
  }

  ngOnInit() {
    this.setSelectedReport();
  }

  pdfOnload(event) {
    debugger
    console
    const pdfTatget: any = event.target;
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.localPDF = this.pdfSrc;
      };
      this.pdfBufferRender = pdfTatget.files[0];
      reader.readAsArrayBuffer(pdfTatget.files[0]);
    }
  }
  get f() { return this.reportForm.controls; }

  private createForm() {
    debugger
    this.reportForm = this.formBuilder.group({
      statusID: [true],
      customerID: 0,
      diagnosticCatID: 0,
      laboratoryID: [0],
      image: this.pdfFile,
    });
  }
  private editForm(obj) {
    debugger
    this.f.customerID.setValue(obj.customerID);
    this.f.diagnosticCatID.setValue(obj.diagnosticCatID);
    this.f.image.setValue(obj.image);
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);
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
    //this.f.image.setValue(this.imgComp.imageUrl);

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
    debugger
    this.laboratoryService.loadCustomer().subscribe((res: any) => {
      this.CustomerList = res;
    });
  }

  private loadCategories() {
    debugger
    this.diagnosticcategoriesService.loadCategory().subscribe((res: any) => {
      this.CategoryList = res;
    });
  }
  removeImage(obj) {
    const index = this.Images.indexOf(obj);
    this.Images.splice(index, 1);
    this.f.imagesSource.setValue(this.Images);
  }
}
