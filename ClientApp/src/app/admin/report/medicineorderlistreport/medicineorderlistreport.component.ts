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
import { MedicineOrderListReport} from 'src/app/_models/Report';
import { MedicineOrderListReportService } from 'src/app/_services/medicineorderlistreport.service';

@Component({
  selector: 'app-medicineorderlistreport',
  templateUrl: './medicineorderlistreport.component.html',
  providers: [ExcelService,DatePipe]
})

export class MedicineOrderListReportComponent implements OnInit {
  total$: Observable<number>;
  loading$: Observable<boolean>;
  data$: Observable<MedicineOrderListReport[]>;

  @ViewChild(NgbdDatepickerRangePopup, { static: true }) _datepicker;
 
  locationSubscription: Subscription;
  submit: boolean;
  orderDetails: MedicineOrderListReport[] = [];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('locationDrp') drplocation: any;
  constructor(public service: MedicineOrderListReportService,
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
    this.service.medicineorderlistRpt(this.parseDate(this._datepicker.fromDate), this.parseDate(this._datepicker.toDate))
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
  //  this.excelService.exportMedicineReport(this.orderDetails, 'Report_Export');
  //}

  exportAsXLSX(): void {
    const fromDate = this.parseDate(this._datepicker.fromDate);
    const toDate = this.parseDate(this._datepicker.toDate);

    this.orderDetails = this.orderDetails.map(order => {
      return {
        ...order,
        fromDate: fromDate,
        toDate: toDate
      };
    });
    this.excelService.exportMedicineReport(this.orderDetails, 'Report_Export');
  }
  
  Filter() {
    
    this.getData();
  }
}