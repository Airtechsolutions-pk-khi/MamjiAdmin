import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrappoinmentComponent } from './drappoinment.component';

describe('DrappoinmentComponent', () => {
  let component: DrappoinmentComponent;
  let fixture: ComponentFixture<DrappoinmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrappoinmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrappoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
