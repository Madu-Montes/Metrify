import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  userName: string = 'Usuário';
  medidas = [
    { label: 'Busto', valor: 92 },
    { label: 'Tórax', valor: 88 },
    { label: 'Cintura', valor: 70 },
    { label: 'Quadril', valor: 96 },
    { label: 'Coxa', valor: 50 },
    { label: 'Calçado', valor: 37 },
  ];

  ngOnInit(): void {
    const userData = localStorage.getItem('metrify_user');
    if (userData) {
      const { name } = JSON.parse(userData);
      this.userName = name;
    }
  }
}
