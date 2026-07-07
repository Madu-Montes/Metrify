import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientModal } from './add-patient-modal';

describe('AddPatientModal', () => {
  let component: AddPatientModal;
  let fixture: ComponentFixture<AddPatientModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPatientModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPatientModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
