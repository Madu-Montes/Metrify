import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    const payload = { email, password: senha };

    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((res: any) => {
        localStorage.setItem('metrify_user', JSON.stringify(res.user));
      })
    );
  }

  logout() {
    localStorage.removeItem('metrify_user');
  }
}
