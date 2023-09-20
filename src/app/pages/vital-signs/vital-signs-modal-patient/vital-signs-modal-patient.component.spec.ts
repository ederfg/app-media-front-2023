import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsModalPatientComponent } from './vital-signs-modal-patient.component';

describe('VitalSignsModalPatientComponent', () => {
  let component: VitalSignsModalPatientComponent;
  let fixture: ComponentFixture<VitalSignsModalPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VitalSignsModalPatientComponent]
    });
    fixture = TestBed.createComponent(VitalSignsModalPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
