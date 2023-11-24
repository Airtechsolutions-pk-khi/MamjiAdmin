import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { ToastService } from 'src/app/_services/toastservice';
import { DiagnosticCategoryService } from '../../../../_services/diagnosticcategories.service';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-addreports',
  templateUrl: './addreports.component.html',
})
export class AddreportsComponent implements OnInit {

  formData = {
    customerID: '',
    name: '',
    registrationNo: '',
    referenceNo: '',
    diagnosticCatID: '',
    laboratoryID:'',
    pdfFile: File = null
  };



  selectedFile: File = null;
  percentDone: number;
  uploadSuccess: boolean;

  onFileChange(files: File[]) {
  debugger
    this.selectedFile = files[0];
  }

  //onCustomerSelect(customerID: string) {
  //  this.formData.customerID = customerID;
  //}
  //onCustomerSelectR(customerID: string) { 
  //  this.formData.customerID = customerID;
  //}

  onDiagnosticSelect(diagnosticCatID: string) {   
    this.formData.diagnosticCatID = diagnosticCatID;
  }
  
  submitted = false;
  reportForm: FormGroup;
  loading = false;
  loadingReport = false;
  ButtonText = "Save";
  CustomerList = [];
  RegistrationList = [];
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

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private laboratoryService: LaboratoryService,
    private diagnosticcategoriesService: DiagnosticCategoryService,
    private fileUploadService: FileUploadService

  ) {
    this.createForm();
    //this.loadCustomer();
    //this.loadRNo();
    this.loadCategories();
  }

  ngOnInit() {
    this.setSelectedReport();
  }
 
  get f() { return this.reportForm.controls; }

  private createForm() {
    debugger
    this.reportForm = this.formBuilder.group({
      statusID: [true],
      customerID: 0,
      diagnosticCatID: 0,
      laboratoryID: [0],
      referenceNo: ['', Validators.required],
      name: ['', Validators.required],
      selectedFile: File = null,
    });
  }
  private editForm(obj) {
    debugger
    this.formData.name = obj.name;
    this.formData.diagnosticCatID = obj.diagnoseCatID;    
    this.pdfFilePath = obj.image;
    this.formData.laboratoryID = obj.laboratoryID;
    this.formData.referenceNo = obj.labReferenceNo;
    this.formData.registrationNo = obj.registrationNo;

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
    if(parseInt(this.f.laboratoryID.value) === 0)
    {
      const formData1 = new FormData();    
      formData1.append('name', this.formData.name);
      formData1.append('referenceNo', this.formData.referenceNo);
      formData1.append('registrationNo', this.formData.registrationNo);
      formData1.append('diagnosticCatID', this.formData.diagnosticCatID);          
      formData1.append('file', this.selectedFile);   
   
      this.http.post('api/laboratory/insert', formData1).subscribe(
        response => {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/laboratory/uploadreport']);
          
        },
        error => {
           
        }
      );
    }
    else{
      const formData1 = new FormData();
      formData1.append('name', this.formData.name);
      formData1.append('referenceNo', this.formData.referenceNo);
      formData1.append('registrationNo', this.formData.registrationNo);
      formData1.append('diagnosticCatID', this.formData.diagnosticCatID);
      formData1.append('file', this.selectedFile);     
   
      this.http.post('api/laboratory/update', formData1).subscribe(
        response => {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/laboratory/uploadreport']);
          
        },
        error => {
           
        }
      );
    }
    
  }

  //private loadCustomer() {
  //  debugger
  //  this.laboratoryService.loadCustomer().subscribe((res: any) => {
  //    debugger;
  //    this.CustomerList = res;
       
  //  });
  //}
  //private loadRNo() {
  //  debugger
  //  this.laboratoryService.loadRNo().subscribe((res: any) => {
  //    debugger;
  //    this.RegistrationList = res;
       
  //  });
  //}

  private loadCategories() {
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
