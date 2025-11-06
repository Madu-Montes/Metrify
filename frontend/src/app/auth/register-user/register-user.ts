import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.scss']
})
export class RegisterUserComponent {
  registerForm: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { nome, email, senha } = this.registerForm.value;

    // Salva o usuário no localStorage (simulado)
    const users = JSON.parse(localStorage.getItem('metrify_users') || '[]');
    users.push({ nome, email, senha });
    localStorage.setItem('metrify_users', JSON.stringify(users));

    alert('Conta criada com sucesso!');
    this.router.navigate(['/login']);
  }
}
