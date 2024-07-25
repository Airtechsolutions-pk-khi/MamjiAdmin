import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrescriptionReportComponent } from './prescriptionreport.component';




describe('PrescriptionReportComponent', () => {
  let component: PrescriptionReportComponent;
  let fixture: ComponentFixture<PrescriptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
