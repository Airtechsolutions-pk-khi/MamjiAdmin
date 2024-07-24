import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicineReportComponent } from './medicinereport.component';



describe('MedicineReportComponent', () => {
  let component: MedicineReportComponent;
  let fixture: ComponentFixture<MedicineReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
