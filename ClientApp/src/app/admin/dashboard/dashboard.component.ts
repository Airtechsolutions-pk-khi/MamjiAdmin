import { Component, NgModule, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { DashboardSummary } from 'src/app/_models/Dashboard';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerRangePopup } from 'src/app/datepicker-range/datepicker-range-popup';
import { Router } from '@angular/router';
import { AlertService } from '../../_alert/alert.service';

import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { SignalrService } from 'src/app/_services/SignalrService';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};
export type lineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  // options = {
  //   autoClose: false,
  //   keepAfterRouteChange: false
  // };
  data$: Observable<DashboardSummary[]>;
  oldData: DashboardSummary[];
  total$: Observable<number>;
  loading$: Observable<boolean>;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<lineChartOptions>;

  dashboardSummary = new DashboardSummary();
  async ngOnInit() {
    this.GetDashboard();
    this.GetChart();
    this.GetLineChart();
    await this.singlarService.startConnection();
  }

  constructor(public service: DashboardService,
    public ls: LocalStorageService,
    public router: Router,
    private singlarService: SignalrService,
    // public alertService: AlertService
  ) {
    this.loading$ = service.loading$;
  //  this.lineChartOptions = {
  //    series: [
  //      {
  //        name: "Appointment",
  //        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  //      }
  //    ],
  //    chart: {
  //      height: 350,
  //      type: "line",
  //      zoom: {
  //        enabled: false
  //      }
  //    },
  //    dataLabels: {
  //      enabled: false
  //    },
  //    stroke: {
  //      curve: "straight"
  //    },
  //    title: {
  //      text: "",
  //      align: "left"
  //    },
  //    grid: {
  //      row: {
  //        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
  //        opacity: 0.5
  //      }
  //    },
  //    xaxis: {
  //      categories: [
  //        "Jan",
  //        "Feb",
  //        "Mar",
  //        "Apr",
  //        "May",
  //        "Jun",
  //        "Jul",
  //        "Aug",
  //        "Sep"
  //      ]
  //    }
  //  };
  }
  BindTodaysSales(sales, timeSlot) {
    this.chartOptions = {
      series: [
        {
          name: "Appointments",
          data: sales
        }
      ],
      chart: {
        height: 300,
        type: "bar"
      },
      xaxis: {
        categories: timeSlot
      }
    };

  }

  BindMonthlySales(appointments, months) {
    this.lineChartOptions = {
      series: [
        {
          name: "Appointments",
          data: appointments
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: months
      }
    }
  }
  GetDashboard() {
    debugger
    this.service.getAllData().subscribe((res: any) => {
      this.dashboardSummary = res[0];
    });
  }
  GetChart() {
    this.service.getChart().subscribe((res: any) => {
      debugger
      this.BindTodaysSales(res.todaysales.appointments, res.todaysales.timeSlot);
    });
  }
  GetLineChart() {
    debugger
    this.service.getLineChart().subscribe((res: any) => {
      debugger
      this.BindMonthlySales(res.todaysales.appointments, res.todaysales.timeSlot);
    });
  }
}
