import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-codigo-acesso',
  standalone: true,
  imports: [CommonModule, MatButtonModule, HeaderComponent],
  templateUrl: './code-access.html',
  styleUrls: ['./code-access.scss']
})

export class CodigoAcesso implements OnInit {
  userCode = '';
  qrUrl = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const code = localStorage.getItem('accessCode');

    if (!code) {
      alert('Código de acesso não encontrado.');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.userCode = code;
    this.qrUrl = this.buildQrUrl(code);
  }

  buildQrUrl(value: string) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(value)}`;
  }

  copiarCodigo() {
    navigator.clipboard.writeText(this.userCode).then(() => {
      alert('Código copiado!');
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}

