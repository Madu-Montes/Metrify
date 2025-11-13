import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAccess } from './code-access';

describe('CodeAccess', () => {
  let component: CodeAccess;
  let fixture: ComponentFixture<CodeAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
