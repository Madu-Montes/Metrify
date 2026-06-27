import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsModal } from './notifications-modal';

describe('NotificationsModal', () => {
  let component: NotificationsModal;
  let fixture: ComponentFixture<NotificationsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
