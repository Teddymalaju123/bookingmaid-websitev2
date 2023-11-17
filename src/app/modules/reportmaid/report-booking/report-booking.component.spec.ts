import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBookingComponent } from './report-booking.component';

describe('ReportBookingComponent', () => {
  let component: ReportBookingComponent;
  let fixture: ComponentFixture<ReportBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportBookingComponent]
    });
    fixture = TestBed.createComponent(ReportBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
