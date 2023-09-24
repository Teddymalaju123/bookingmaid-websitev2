import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaidModifyComponent } from './maid-modify.component';

describe('MaidModifyComponent', () => {
  let component: MaidModifyComponent;
  let fixture: ComponentFixture<MaidModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaidModifyComponent]
    });
    fixture = TestBed.createComponent(MaidModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
