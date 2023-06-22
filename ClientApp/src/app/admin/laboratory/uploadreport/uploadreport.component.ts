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
  loading$: Observable<boolean>;

  locationSubscription: Subscription;
  submit: boolean;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: LaboratoryService,
    public ls: LocalStorageService,
    public excelService: ExcelService,
    public ts: ToastService,
    public router: Router,
    private http: HttpClient) {  
      
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
    var pth = URL.replace("D:\\Inetpub\\mamjihospital.online\\admin.mamjihospital.online\\","");
    var a = pth.replace("pdfFiles/","pdfFiles\\");

     //local
    //const apiUrl = 'http://localhost:59660/api/laboratory/loadpdf?path=' + URL;  
    //live
    const apiUrl = 'http://admin.mamjihospital.online/api/laboratory/loadpdf?path=' + URL;  
    //const apiUrl = Global.DomainName + '/api/laboratory/loadpdf?path=' + URL;  
    //const apiUrl = 'http:\\admin.mamjihospital.online\\api\\laboratory\\loadpdf?path=' + a;  
    var rptName = pth.replace("pdfFiles/","");
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, 'Report_'+rptName);
    });
  }
  
}
