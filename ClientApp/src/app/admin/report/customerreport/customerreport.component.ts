import { Component, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toastservice';
import { ReportService } from 'src/app/_services/report.service';
import { Location } from 'src/app/_models/Location';
import { NgbdDatepickerRangePopup } from 'src/app/datepicker-range/datepicker-range-popup';
import { delay, map } from 'rxjs/operators';
import { ExcelService } from 'src/ExportExcel/excel.service';
import { DatePipe } from '@angular/common';
import { CustomerReport } from 'src/app/_models/Report';
import { CustomerReportService } from 'src/app/_services/customerreport.service';
@Component({
  selector: 'app-customerreport',
  templateUrl: './customerreport.component.html',
  providers: [ExcelService,DatePipe]
})

export class CustomerReportComponent implements OnInit {
  total$: Observable<number>;
  loading$: Observable<boolean>;
  data$: Observable<CustomerReport[]>;
  @ViewChild(NgbdDatepickerRangePopup, { static: true }) _datepicker;
  locationSubscription: Subscription;
  submit: boolean;
  orderDetails: CustomerReport[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('locationDrp') drplocation: any;
  constructor(public service: CustomerReportService,
    public ls: LocalStorageService,
    public ts: ToastService,
    public excelService: ExcelService,
    public router: Router,
    private datePipe: DatePipe) {   
  }

  ngOnInit() {
    this.getRptDate();
  }
  getRptDate()
  {
    this.getData();
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.loading$ = this.service.loading$;
  }
  parseDate1(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd'); // Adjust format as needed for the backend
  }
  getData() {
    this.service.CustomerRpt(this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
      .subscribe((res: any[]) => {
        if (res != null) {
          debugger
          //this.orderDetails = res;
          this.orderDetails = res;
            
           
        }
        else
          this.ts.showError("Error", "Something went wrong");

      }, error => {
        this.ts.showError("Error", "Failed to delete record.")
      });
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
  parseDate(obj) {
    return obj.year + "-" + obj.month + "-" + obj.day;;
  }
  //exportAsXLSX(): void {

  //  this.excelService.exportAsExcelFile(this.orderDetails, 'Report_Export');
  //}

  exportAsXLSX(): void {
    const fromDate = this.parseDate(this._datepicker.fromDate);
    const toDate = this.parseDate(this._datepicker.toDate);

    this.orderDetails = this.orderDetails.map(order => {
      return {
        ...order,
        image: this.showImagePath(order),
        fromDate: fromDate,
        toDate: toDate
      };
    });
    this.excelService.exportCustomerReport(this.orderDetails, 'Report_Export');
  }
  showImagePath(order) {
    return 'http://admin.mamjihospital.online/' + order.image; 
  }
  
 
  Filter() {
    
    this.getData();
  }
}
