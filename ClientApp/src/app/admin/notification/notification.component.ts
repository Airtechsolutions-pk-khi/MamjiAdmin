import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toastservice';
import { ExcelService } from 'src/ExportExcel/excel.service';
import { Notification } from 'src/app/_models/Notification';
import { NotificationService } from 'src/app/_services/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  providers: [ExcelService]
})
export class NotificationComponent implements OnInit {
  data$: Observable<Notification[]>;
  oldData: Notification[];
  total$: Observable<number>;
  loading$: Observable<boolean>;
  private selectedNotification;

  locationSubscription: Subscription;
  submit: boolean;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(public service: NotificationService,
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
  updateStatus(item, status) {
    debugger
    item.isRead = status;
    //Update 
    this.service.status(item).subscribe(data => {

      if (data != 0) {
        this.ts.showSuccess("Success", "Record updated successfully.")
        this.router.navigate(['/admin/notification']);
      }
    }, error => {
      this.ts.showError("Error", "Failed to update record.")
    });
  }
}
