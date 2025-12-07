import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const payload = { email, password: password };

    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((res: any) => {
        localStorage.setItem('metrify_token', res.token);
        console.log('TOKEN SALVO?', localStorage.getItem('metrify_token'));
      })
    );
  }

   register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  logout() {
    localStorage.removeItem('metrify_token');
    localStorage.removeItem('metrify_user');
  }
}
