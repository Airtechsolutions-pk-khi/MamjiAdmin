import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';

import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Router } from '@angular/router';
import { Banner } from 'src/app/_models/Banner';
import { ToastService } from 'src/app/_services/toastservice';
import { Specialities } from '../../../_models/Specialities';
import { SpecialityService } from '../../../_services/speciality.service';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  providers: []
})

export class SpecialityComponent implements OnInit {
  data$: Observable<Specialities[]>;  
  oldData: Specialities[];
  total$: Observable<number>;
  loading$: Observable<boolean>;
  private selectedService;
  
  locationSubscription: Subscription;
  submit: boolean;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: SpecialityService,
    public ls :LocalStorageService,
    public ts :ToastService,
    public router:Router) {
/*     this.selectedBrand =this.ls.getSelectedBrand().brandID;*/

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

  Edit(service) {
        this.router.navigate(["admin/settings/speciality/edit", service]);
  }

  Delete(obj) {
    this.service.delete(obj).subscribe((res: any) => {
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