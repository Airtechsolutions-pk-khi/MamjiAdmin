import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { Laboratory } from 'src/app/_models/Laboratory';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { ToastService } from 'src/app/_services/toastservice';
import { ExcelService } from 'src/ExportExcel/excel.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Global } from 'src/app/GlobalAndCommons/Global';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-uploadreport',
  templateUrl: './uploadreport.component.html',
  styleUrls: ['./uploadreport.component.css'],
  providers: [ExcelService]
})
export class UploadreportComponent implements OnInit {
 
  data$: Observable<Laboratory[]>;
  oldData: Laboratory[];
  total$: Observable<number>;
  closeResult: string;  
  loading$: Observable<boolean>;

  locationSubscription: Subscription;
  submit: boolean;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: LaboratoryService,
    public ls: LocalStorageService,
    public excelService: ExcelService,
    public ts: ToastService,
    public router: Router,
    private http: HttpClient,
    private modalService: NgbModal) {  
      
      this.loading$ = service.loading$;
      this.submit = false;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getAllData();
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.loading$ = this.service.loading$;
  }
  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  Edit(medicine) {
     
    this.router.navigate(["admin/laboratory/uploadreport/edit", medicine]);
  }
  Delete(obj) {
    this.service.delete(obj).subscribe((res: any) => {
      if (res != 0) {
        this.ts.showSuccess("Success", "Record deleted successfully.")
        this.getData();
      }
      else
        this.ts.showError("Error", "Failed to delete record.")

    }, error => {
      this.ts.showError("Error", "Failed to delete record.")
    });
  }

  DownloadRpt(URL: string) {
    debugger       
     var pth = URL.replace("/ClientApp/dist/assets/Upload/pdfFiles/","ClientApp/dist/assets/Upload/pdfFiles/");
     //var rptName = pth.replace("pdfFiles/","");

     //local
    //const apiUrl = 'http://localhost:59660/api/laboratory/loadpdf?path=' + URL;  
    //live
    const apiUrl = 'http://admin.mamjihospital.online/api/laboratory/loadpdf?path=' + pth;  
    
    var rptName = pth.replace("ClientApp/dist/assets/Upload/pdfFiles/","");
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, rptName);
    });
  }
  open(content, obj) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.Delete(obj);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
