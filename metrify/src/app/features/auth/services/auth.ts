import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private readonly router: Router
  ) {}

  login(){
    localStorage.setItem(
      'token',
      'metrify-user-token'
    );

    this.router.navigate([
      '/dashboard'
    ]);
  }

  logout(){
    localStorage.removeItem(
      'token'
    );
    this.router.navigate([
      '/'
    ]);
  }

  isAuthenticated(){
    return !!localStorage.getItem('token');
  }

}
