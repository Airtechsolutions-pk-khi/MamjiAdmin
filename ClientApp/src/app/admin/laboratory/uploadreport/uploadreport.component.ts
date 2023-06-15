import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { Laboratory } from 'src/app/_models/Laboratory';
import { LaboratoryService } from 'src/app/_services/laboratory.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { ToastService } from 'src/app/_services/toastservice';
import { ExcelService } from 'src/ExportExcel/excel.service';

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
    public router: Router) {  
      
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
    debugger
    this.router.navigate(["admin/laboratory/uploadreport/edit", medicine]);
  }
  Delete(obj) {
    debugger
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

  DownloadRpt(data) {
    debugger
   window.open('http://admin.mamjihospital.online/'+data);
  }
}
