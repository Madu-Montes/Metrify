import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../features/auth/services/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(
    private readonly authService: AuthService
  ) {}

  logout(){
    this.authService.logout();
  }

}
