import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageuploadComponent } from 'src/app/imageupload/imageupload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { ToastService } from 'src/app/_services/toastservice';
import { PromotionService } from 'src/app/_services/promotion.service';
 


@Component({
  selector: 'app-addpromotion',
  templateUrl: './addpromotion.component.html',

})
export class AddPromotionComponent implements OnInit {
  submitted = false;
  promotionForm: FormGroup;
  loading = false;
  loadingPromotion = false;
  ButtonText = "Save"; selectedCityIds
  selectedSubCategoriesIds: string[];
  selectedLocationIds: string[];
  selectedgroupModifierIds: string[];

  @ViewChild(ImageuploadComponent, { static: true }) imgComp;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public ts: ToastService,
    private Promotionesrvice: PromotionService

  ) {
    this.createForm();
  }
  ngOnInit() {
    this.setSelectedDoctor();
  }

  get f() { return this.promotionForm.controls; }

  private createForm() {
    this.promotionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      discount: [0],     
      image: [''],
      statusID: [true],
      promotionID: 0,
    });
  }
  private editForm(obj) {
    this.f.name.setValue(obj.name);
    this.f.description.setValue(obj.description);
    this.f.discount.setValue(obj.discount);    
    this.f.image.setValue(obj.image);   
    this.f.statusID.setValue(obj.statusID === 1 ? true : false);
  }
  setSelectedDoctor() {
    this.route.paramMap.subscribe(param => {
      const sid = +param.get('id');
      if (sid) {
        this.loadingPromotion = true;
        this.f.promotionID.setValue(sid);
        this.Promotionesrvice.getById(sid).subscribe(res => {
          //Set Forms
          this.editForm(res);
          this.loadingPromotion = false;
        });
      }
    })
  }
  onSubmit() {
    this.promotionForm.markAllAsTouched();
    this.submitted = true;
    if (this.promotionForm.invalid) { return; }
    this.loading = true;
    this.f.statusID.setValue(this.f.statusID.value === true ? 1 : 2);
    this.f.image.setValue(this.imgComp.imageUrl);

    if (parseInt(this.f.promotionID.value) === 0) {
      //Insert doctor
      console.log(JSON.stringify(this.promotionForm.value));
      this.Promotionesrvice.insert(this.promotionForm.value).subscribe(data => {
        if (data != 0) {
          this.ts.showSuccess("Success", "Record added successfully.")
          this.router.navigate(['/admin/managedoctor/doctor']);
        }
        this.loading = false;
      }, error => {
        this.ts.showError("Error", "Failed to insert record.")
        this.loading = false;
      });
    } else {
      //Update doctor
      this.Promotionesrvice.update(this.promotionForm.value).subscribe(data => {
        this.loading = false;
        if (data != 0) {
          this.ts.showSuccess("Success", "Record updated successfully.")
          this.router.navigate(['/admin/settings/promotion']);
        }
      }, error => {
        this.ts.showError("Error", "Failed to update record.")
        this.loading = false;
      });
    }
  }



}

