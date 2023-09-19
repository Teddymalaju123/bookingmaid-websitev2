import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaidDetailComponent } from './maid-detail.component';

describe('MaidDetailComponent', () => {
  let component: MaidDetailComponent;
  let fixture: ComponentFixture<MaidDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaidDetailComponent]
    });
    fixture = TestBed.createComponent(MaidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
