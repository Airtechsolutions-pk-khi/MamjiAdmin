import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { MedicineService } from 'src/app/_services/medicine.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/_models/Medicine';
import { ToastService } from 'src/app/_services/toastservice';
import { ExcelService } from 'src/ExportExcel/excel.service';
@Component({
  selector: 'app-customers',
  templateUrl: './medicine.component.html',
  providers: [ExcelService]
})
export class MedicineComponent implements OnInit {
  data$: Observable<Medicine[]>;
  oldData: Medicine[];
  total$: Observable<number>;
  loading$: Observable<boolean>;

  locationSubscription: Subscription;
  submit: boolean;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: MedicineService,
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
  //exportAsXLSX(): void {
  //  this.service.ExportList(this.selectedBrand).subscribe((res: any) => {
  //    this.excelService.exportAsExcelFile(res, 'Report_Export');
  //  }, error => {
  //    this.ts.showError("Error", "Failed to export")
  //  });
  //}
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
    this.router.navigate(["admin/pharmacy/medicine/edit", medicine]);
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
}
