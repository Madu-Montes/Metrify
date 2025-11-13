import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-codigo-acesso',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './code-access.html',
  styleUrls: ['./code-access.scss']
})
export class CodigoAcesso implements OnInit {
  userCode = '';
  qrUrl = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('metrify_user');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userData);
    if (!user.code) {
      user.code = crypto?.randomUUID?.() ?? this.simpleRandomCode();
      const users = JSON.parse(localStorage.getItem('metrify_users') || '[]');
      const idx = users.findIndex((u: any) => u.email === user.email);
      if (idx >= 0) { users[idx].code = user.code; localStorage.setItem('metrify_users', JSON.stringify(users)); }
      localStorage.setItem('metrify_user', JSON.stringify(user));
    }

    this.userCode = user.code;
    this.qrUrl = this.buildQrUrl(this.userCode);
  }

  buildQrUrl(value: string) {
    const size = 250;
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=svg`;
  }

  copiarCodigo() {
    if (!this.userCode) return;
    navigator.clipboard.writeText(this.userCode).then(() => {
      alert('Código copiado!');
    }, () => {
      alert('Não foi possível copiar. Copie manualmente.');
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  private simpleRandomCode(len = 8) {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
    return s;
  }
}
