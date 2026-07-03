import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTable } from './patients-table';

describe('PatientsTable', () => {
  let component: PatientsTable;
  let fixture: ComponentFixture<PatientsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
