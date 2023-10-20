import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { ToastService } from 'src/app/_services/toastservice';
import { DiagnosticCategoryService } from '../../../../_services/diagnosticcategories.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-addreports',
  templateUrl: './addreports.component.html',
})
export class AddreportsComponent implements OnInit {

  formData = {
    customerID: '',
    diagnosticCatID: ''
  };

  selectedFile: File;

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  onCustomerSelect(customerID: string) {
    debugger;
    // this.formData.customerID = customerID.split(' ')[1];
    this.formData.customerID = customerID;
  }

  onDiagnosticSelect(diagnosticCatID: string) {
    debugger;
    // this.formData.diagnosticCatID = diagnosticCatID.split(' ')[1];
    this.formData.diagnosticCatID = diagnosticCatID;
  }
  
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
  pdfFile: [''];
  pdfFilePath: string = '';
  pdfSrc;
  pdfBufferRender;
  localPDF;

  fileName = '';

  // selectedFile: File = null;

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


onFileSelect(files: FileList): void {
  debugger
  this.selectedFile = files.item(0);
}

  get f() { return this.reportForm.controls; }

  private createForm() {
    debugger
    this.reportForm = this.formBuilder.group({
      statusID: [true],
      customerID: 0,
      diagnosticCatID: 0,
      laboratoryID: [0],
      selectedFile: File = null,
    });
  }
  private editForm(obj) {
    debugger
    // this.f.customerID.setValue(obj.customerID);
    // this.f.diagnosticCatID.setValue(obj.diagnosticCatID);
    console.log(this.CategoryList);
    console.log(this.CustomerList);

    this.formData.customerID = obj.customerID;
    this.formData.diagnosticCatID = obj.diagnoseCatID;    
    this.pdfFilePath = obj.image;

    this.f.statusID.setValue(obj.statusID === true ? 1 : 2);
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
          debugger;
          this.loadingReport = false;
        });
      }
    })
  }
  
  onSubmit() {
    debugger
    const formData = new FormData();
    
    formData.append('customerID', this.formData.customerID);
    formData.append('diagnosticCatID', this.formData.diagnosticCatID);
    formData.append('pdfFile', this.selectedFile, this.selectedFile.name);    
    this.http.post('api/laboratory/insert', this.formData).subscribe(
      response => {
        this.ts.showSuccess("Success", "Record added successfully.")
        this.router.navigate(['/admin/laboratory/uploadreport']);
        
      },
      error => {
         
      }
    );
  }

  private loadCustomer() {
    debugger
    this.laboratoryService.loadCustomer().subscribe((res: any) => {
      debugger;
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

  // onSubmit() {
  //   debugger
 
  //   const formData = new FormData();
    
  //   formData.append('customerID', this.formData.customerID);
  //   formData.append('diagnosticCatID', this.formData.diagnosticCatID);
  //   formData.append('pdfFile', this.selectedFile, this.selectedFile.name);  
  //   // this.reportForm.markAllAsTouched();
  //   // this.submitted = true;

  //   // if (this.formData.invalid) { return; }
  //   this.loading = true;
  //   this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);

  //   //this.f.pdfFile.setValue(this.selectedFile.name);
    
  //   if (parseInt(this.f.laboratoryID.value) === 0) {
  //     //Insert customer
  //     console.log(JSON.stringify(this.reportForm.value));
  //     this.laboratoryService.insert(this.formData.value).subscribe(data => {
  //       if (data != 0) {
  //         this.ts.showSuccess("Success", "Record added successfully.")
  //         this.router.navigate(['/admin/laboratory/uploadreport']);
  //       }
  //       this.loading = false;
  //     }, error => {
  //       this.ts.showError("Error", "Failed to insert record.")
  //       this.loading = false;
  //     });
  //   } else {
  //     //Update customer
  //     this.laboratoryService.update(this.reportForm.value).subscribe(data => {
  //       this.loading = false;
  //       if (data != 0) {
  //         this.ts.showSuccess("Success", "Record updated successfully.")
  //         this.router.navigate(['/admin/laboratory/uploadreport']);
  //       }
  //     }, error => {
  //       this.ts.showError("Error", "Failed to update record.")
  //       this.loading = false;
  //     });
  //   }
  // }





  