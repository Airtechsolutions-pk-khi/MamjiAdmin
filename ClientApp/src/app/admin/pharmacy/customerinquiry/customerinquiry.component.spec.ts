import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinquiryComponent } from './customerinquiry.component';

describe('CustomerinquiryComponent', () => {
  let component: CustomerinquiryComponent;
  let fixture: ComponentFixture<CustomerinquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerinquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerinquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
