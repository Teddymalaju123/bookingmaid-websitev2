import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaidComponent } from './edit-maid.component';

describe('EditMaidComponent', () => {
  let component: EditMaidComponent;
  let fixture: ComponentFixture<EditMaidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaidComponent]
    });
    fixture = TestBed.createComponent(EditMaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
