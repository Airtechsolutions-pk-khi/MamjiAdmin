import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toastservice';
import { ExcelService } from 'src/ExportExcel/excel.service';
import { Prescription } from 'src/app/_models/Prescription';
import { PrescriptionService } from 'src/app/_services/prescription.service';
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  providers: [ExcelService]
})
export class PrescriptionComponent implements OnInit {
  data$: Observable<Prescription[]>;  
  oldData: Prescription[];
  total$: Observable<number>;
  loading$: Observable<boolean>;
  private selectedPrescription;

  locationSubscription: Subscription;
  submit: boolean;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(public service: PrescriptionService,
    public ls :LocalStorageService,
    public excelService: ExcelService,
    public ts :ToastService,
    public router:Router) {
    //this.selectedPrescription =this.ls.getSelectedPrescription().prescriptionID;
 
     this.loading$ = service.loading$;
     this.submit = false;
     
   }
   exportAsXLSX(): void {
    this.service.ExportList(this.selectedPrescription).subscribe((res: any) => {    
/*      this.excelService.exportAsExcelFile(res, 'Report_Export');*/
    }, error => {
      this.ts.showError("Error","Failed to export")
    });
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
  Edit(prescription) {
    this.router.navigate(["admin/pharmacy/prescription/edit", prescription]);
  }
  Delete(data) {
    this.service.delete(data).subscribe((res: any) => {
      if(res!=0){
        this.ts.showSuccess("Success","Record deleted successfully.")
        this.getData();
      }
      else
      this.ts.showError("Error","Failed to delete record.")
    
    }, error => {
      this.ts.showError("Error","Failed to delete record.")
    });
    }  
 }
