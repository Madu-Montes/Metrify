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
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
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
      width: '300px',
      panelClass: 'modal-excluir',
      data: { medida: { label: 'suas medidas' } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.medidas = [];
        localStorage.removeItem('metrify_medidas');
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
    <div class="confirm-modal">
      <button class="close-btn" (click)="onCancel()" aria-label="Fechar">
        <i class="bi bi-x-lg"></i>
      </button>

      <h3>Excluir minhas medidas</h3>
      <p>Tem certeza de que deseja excluir <strong>{{ data.medida.label }}</strong>?</p>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="warn" (click)="onConfirm()">Excluir</button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-modal { position: relative; padding: 1rem 0.5rem; color: #fff; }
    .confirm-modal h3 { margin: 0 0 8px; color: #fff; font-size: 18px; }
    .confirm-modal p { margin: 0 0 16px; color: rgba(255,255,255,0.95); }
    .close-btn { position: absolute; top: 8px; right: 8px; background: transparent; border: none; color: #fff; }
    .dialog-actions { display:flex; gap:0.5rem; justify-content:flex-end; }
  `]
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
