import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsModal } from '../../../../shared/components/notifications-modal/notifications-modal';

@Component({
  selector: 'app-dashboard',
  imports: [MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private dialog: MatDialog) {}

  openNotifications() {
    this.dialog.open(NotificationsModal, {
      width: '500px',
      maxHeight: '80vh',
    });
  }
}
