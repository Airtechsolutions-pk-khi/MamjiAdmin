import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { FormPermissionService } from 'src/app/_services/formpermission.service';
import { ToastService } from 'src/app/_services/toastservice';
import { FormPermission } from '../../_models/FormPermission';
//import { debug } from 'console';

@Component({
  selector: 'app-formpermission',
  templateUrl: './formpermission.component.html'
})
export class FormPermissionComponent implements OnInit {
  public formName = new FormPermission();
  submitted = false;
  permissionForm: FormGroup;
  loading = false;
  loadingformpermission = false;
  ButtonText = "Save";
  UserList = [];

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private permissionService: FormPermissionService

  ) {
    this.createForm();
    this.loadUser();
  }

  get f() { return this.permissionForm.controls; }

  private createForm() {
    this.permissionForm = this.formBuilder.group({
      notification: [true],
      doctor: [true],
      mamjiUser: [true],
      pharmacy: [true],
      reception: [true],
      diagnostic: [true],
      reports: [true],
      setting: [true],
      roleName: [''],
      permissionID: [0],
    });
  }

  private editForm(obj) {
    debugger
    this.f.notification.setValue(obj.notification ===1 ? true : false);
    this.f.doctor.setValue(obj.doctor ===1 ? true : false);
    this.f.mamjiUser.setValue(obj.mamjiUser ===1 ? true : false);
    this.f.pharmacy.setValue(obj.pharmacy ===1 ? true : false);
    this.f.reception.setValue(obj.reception ===1 ? true : false);
    this.f.diagnostic.setValue(obj.diagnostic ===1 ? true : false);
    this.f.reports.setValue(obj.reports ===1 ? true : false);
    this.f.settings.setValue(obj.settings ===1 ? true : false);
    this.f.permissionID.setValue(obj.permissionID);
  }
  ngOnInit() {
    //this.setSelectedOrder();

  }

  onSelect(formName) {
    debugger
    this.permissionService.getById(formName).subscribe(res => {
      //Set Forms
      if (res != null) {
        this.formName = res[0];
      }
      debugger
    });
  }

  onSubmit() {
    debugger
    {
      this.permissionService.update(this.permissionForm.value).subscribe(data => {
        this.loading = false;
        if (data != 0) {
          this.ts.showSuccess("Success", "Record updated successfully.")
          this.router.navigate(['/admin/permission']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }
  private loadUser() {
    //this.userService.loadUser().subscribe((res: any) => {
    //  this.UserList = res;
    //});
    debugger
    this.UserList = [
      { "type": "Super Admin" },
      { "type": "Admin" },
      { "type": "Pharmacy" },
      { "type": "Reception" },
      { "type": "Laboratory" },
    ];
  }
}
