import { Component, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { NgbdSortableHeader } from 'src/app/_directives/sortable.directive';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toastservice';
import { ReportService } from 'src/app/_services/report.service';
import { SalesdetailReport } from 'src/app/_models/Report';
import { Location } from 'src/app/_models/Location';
import { NgbdDatepickerRangePopup } from 'src/app/datepicker-range/datepicker-range-popup';
import { delay, map } from 'rxjs/operators';
import { ExcelService } from 'src/ExportExcel/excel.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-salesdetail',
  templateUrl: './salesdetail.component.html',
  providers: [ExcelService,DatePipe]
})

export class SalesdetailComponent implements OnInit {
  data$: Observable<SalesdetailReport[]>;

  @ViewChild(NgbdDatepickerRangePopup, { static: true }) _datepicker;
 
  locationSubscription: Subscription;
  submit: boolean;
  orderDetails: SalesdetailReport[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('locationDrp') drplocation: any;
  constructor(public service: ReportService,
    public ls: LocalStorageService,
    public ts: ToastService,
    public excelService: ExcelService,
    public router: Router,
    private datePipe: DatePipe) {
    
  }

  ngOnInit() {
    
  }
  parseDate1(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd'); // Adjust format as needed for the backend
  }
  getData() {
    this.service.SalesDetailRpt(this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
      .subscribe((res: any[]) => {
        if (res != null) {
          debugger
          //this.orderDetails = res;
          this.orderDetails = res.map((item: any) => {
            const rawDate = new Date(item.createdOn);
            item.createdOn = this.datePipe.transform(rawDate, 'dd-MM-yyyy hh:mm a');
            return item;
          });
        }
        else
          this.ts.showError("Error", "Something went wrong");

      }, error => {
        this.ts.showError("Error", "Failed to delete record.")
      });
  }

  parseDate(obj) {
    return obj.year + "-" + obj.month + "-" + obj.day;;
  }
  exportAsXLSX(): void {
    
    this.excelService.exportAsExcelFile(this.orderDetails, 'Report_Export');
  }
  
  
  Filter() {
    
    this.getData();
  }
}
