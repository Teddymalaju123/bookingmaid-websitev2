import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaidBookingComponent } from './maid-booking.component';

describe('MaidBookingComponent', () => {
  let component: MaidBookingComponent;
  let fixture: ComponentFixture<MaidBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaidBookingComponent]
    });
    fixture = TestBed.createComponent(MaidBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
