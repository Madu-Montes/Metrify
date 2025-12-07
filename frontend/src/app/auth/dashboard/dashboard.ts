import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  userName: string = 'Usuário';
  userEmail: string = '';
  medidas: any[] = [];

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('metrify_user');

    if (userData) {
      const { name, email } = JSON.parse(userData);
      this.userName = name;
      this.userEmail = email;
    }
    const medidasSalvas = localStorage.getItem('metrify_medidas');
    this.medidas = medidasSalvas ? JSON.parse(medidasSalvas) : [];
  }

  novaMedida() {
    this.router.navigateByUrl('/register');
  }

  abrirModalExcluirTodas() {
    const dialogRef = this.dialog.open(DialogConfirmacao, {
      width: '360px',
      panelClass: 'modal-excluir',
      data: { medida: { label: 'todas as suas medidas' } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        localStorage.removeItem('metrify_medidas');

        this.medidas = [];

        console.log('Todas as medidas foram excluídas.');
      }
    });
  }

  verCodigoAcesso() {
    this.router.navigate(['/code-access']);
  }
}

@Component({
  selector: 'dialog-confirmacao',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="modal-wrapper">
      <button class="close-btn" (click)="onCancel()" aria-label="Fechar">
        <mat-icon>close</mat-icon>
      </button>

      <h2 class="title">
        <mat-icon class="warn-icon">warning</mat-icon>
        Excluir medidas
      </h2>

      <p class="message">
        Tem certeza que deseja excluir
        <strong>{{ data.medida.label }}</strong
        >?
      </p>

      <div class="actions">
        <button mat-stroked-button color="primary" (click)="onCancel()">Cancelar</button>

        <button mat-flat-button color="warn" (click)="onConfirm()">Excluir</button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-wrapper {
        padding: 1rem;
        position: relative;
      }

      .close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        border: none;
        background: transparent;
        cursor: pointer;
      }

      .title {
        margin: 0 0 12px;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .warn-icon {
        color: #d32f2f;
      }

      .message {
        font-size: 15px;
        margin-bottom: 20px;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }
    `,
  ],
})
export class DialogConfirmacao {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacao>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close('cancel');
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
