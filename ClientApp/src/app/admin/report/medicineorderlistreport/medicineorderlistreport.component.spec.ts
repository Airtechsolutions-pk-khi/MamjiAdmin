import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineOrderListReportComponent } from './medicineorderlistreport.component';



describe('MedicineOrderListReportComponent', () => {
  let component: MedicineOrderListReportComponent;
  let fixture: ComponentFixture<MedicineOrderListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineOrderListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineOrderListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
