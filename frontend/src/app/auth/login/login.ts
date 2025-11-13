import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  loginForm: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const { email, senha } = this.loginForm.value;

  if (email === 'maria@teste.com' && senha === '123456') {
    localStorage.setItem('metrify_user', JSON.stringify({ name: 'Maria', email }));
    localStorage.removeItem('metrify_medidas');
    this.router.navigate(['/dashboard']);

  } else if (email === 'eduarda@teste.com' && senha === '123456') {
    localStorage.setItem('metrify_user', JSON.stringify({ name: 'Eduarda', email }));

    const medidas = [
      { label: 'Busto', valor: 90 },
      { label: 'Tórax', valor: 85 },
      { label: 'Cintura', valor: 68 },
      { label: 'Quadril', valor: 96 },
      { label: 'Coxa', valor: 54 },
      { label: 'Calçado', valor: 36 },
    ];

    localStorage.setItem('metrify_medidas', JSON.stringify(medidas));
    this.router.navigate(['/dashboard']);

  } else {
    alert('Credenciais inválidas');
  }
}

}
