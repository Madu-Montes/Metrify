import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(res => {
        localStorage.setItem('metrify_token', res.token);

        localStorage.setItem(
          'metrify_user',
          JSON.stringify(res.user)
        );
      })
    );
}

  register(name: string, email: string, password: string): Observable<any> {
    const payload = { name, email, password };

    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  logout() {
    localStorage.removeItem('metrify_token');
    localStorage.removeItem('metrify_user');
  }
}
