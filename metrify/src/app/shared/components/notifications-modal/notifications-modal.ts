import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-notifications-modal',
  imports: [
    MatIcon
  ],
  templateUrl: './notifications-modal.html',
  styleUrl: './notifications-modal.css',
})
export class NotificationsModal {

  private readonly dialogRef = inject(MatDialogRef<NotificationsModal>);

  onClickClose() {
    this.dialogRef.close();
  }

}
