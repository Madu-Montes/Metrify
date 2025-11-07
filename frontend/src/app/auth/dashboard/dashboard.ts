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

    if (this.userEmail === 'maria@dados.com' && this.medidas.length === 0) {
      this.medidas = [
        { label: 'Busto', valor: 90 },
        { label: 'Tórax', valor: 85 },
        { label: 'Cintura', valor: 68 },
        { label: 'Quadril', valor: 96 },
        { label: 'Coxa', valor: 54 },
        { label: 'Calçado', valor: 36 },
      ];
      localStorage.setItem('metrify_medidas', JSON.stringify(this.medidas));
    }
  }

  novaMedida() {
    this.router.navigateByUrl('/register');
  }

  abrirModalExcluirTodas() {
    const dialogRef = this.dialog.open(DialogConfirmacao, {
      width: '300px',
      data: { medida: { label: 'todas as medidas' } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.medidas = [];
        localStorage.removeItem('metrify_medidas');
      }
    });
  }
}

@Component({
  selector: 'dialog-confirmacao',
  template: `
    <h2 mat-dialog-title>Excluir Medida</h2>
    <mat-dialog-content>
      Tem certeza que deseja excluir <strong>{{ data.medida.label }}</strong
      >?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Excluir</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogContent, MatDialogActions],
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
