import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsEditComponent } from './vital-signs-edit.component';

describe('VitalSignsEditComponent', () => {
  let component: VitalSignsEditComponent;
  let fixture: ComponentFixture<VitalSignsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VitalSignsEditComponent]
    });
    fixture = TestBed.createComponent(VitalSignsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
