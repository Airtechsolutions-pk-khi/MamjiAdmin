import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';
// import { LoginService } from '../services/login.service';
// import { DashboardService } from '../services/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LocationsService } from '../_services/locations.service';
import { LocalStorageService } from '../_services/local-storage.service';
import { UserService } from '../_services/userservice';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],

})
export class LayoutComponent implements OnInit {
  _Langname = "";
  userName = "";
  type = "";
  email = "";
  locationID: 0;
  Locations: [];
  

  ngOnInit() {
     //var data = this.ls.getSelectedBrand();

    // this.loadLocations();


    // if (data == null)
    //   this.router.navigate(["/"]);
    debugger
    this.type = this.ls.getSelectedBrand().type;
  }
  constructor(private router: Router
    , public service: LocationsService
    , public userService: UserService
    , public ls: LocalStorageService) {
      debugger
      this.userName = this.ls.getSelectedBrand().email;
      this.type = this.ls.getSelectedBrand().type;
      
  }
  Logout() {

    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  // private loadLocations() {
  //   var loc = this.ls.getUsers();
  //   if (loc != null) {
  //     this.Locations = this.ls.getUsers();
  //     this.locationID = this.ls.getSelectedUser().locationID;
  //   }
  //   else {
  //     this.userService.getAllData().subscribe((res: any) => {
  //       debugger
  //       if (res.length > 0) {
  //         this.ls.setUser(res);
  //         this.ls.setSelectedUser(res[0]);
  //         this.locationID =res[0].locationID;
  //         this.Locations =res;
  //       }
  //       else {
  //         this.router.navigate(['/']);
  //       }
  //     });
  //   }
  //   this.Locations = this.ls.getLocation();
  //   this.locationID = this.ls.getSelectedLocation().locationID;

  // }
  changeloc(LocObj) {

    //this.locationID = this.ls.selectedLocation().locationID;
  }
}
