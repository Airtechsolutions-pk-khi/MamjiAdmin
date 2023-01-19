import { Component, NgModule, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { DashboardSummary } from 'src/app/_models/Dashboard';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerRangePopup } from 'src/app/datepicker-range/datepicker-range-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  public chartOptions;
  public chartOptionsDonut;
  data$: Observable<DashboardSummary[]>;
  oldData: DashboardSummary[];
  total$: Observable<number>;
  loading$: Observable<boolean>;
  dashboardSummary = new DashboardSummary();
  ngOnInit() {
    this.GetDashboard();
  }

  constructor(public service: DashboardService,
    public ls: LocalStorageService,
    public router: Router) {
    this.loading$ = service.loading$;
  }

  GetDashboard() {
    this.service.getAllData().subscribe((res: any) => {
      this.dashboardSummary = res[0];
    });
}
}
