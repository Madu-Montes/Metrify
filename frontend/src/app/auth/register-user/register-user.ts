import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
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
export class RegisterUser implements OnInit {
  registerForm: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhaMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      if (this.registerForm.errors?.['senhaMismatch']) {
        alert('As senhas não coincidem!');
      }
      return;
    }

    const { nome, email, senha } = this.registerForm.value;

    const users = JSON.parse(localStorage.getItem('metrify_users') || '[]');
    users.push({ nome, email, senha });
    localStorage.setItem('metrify_users', JSON.stringify(users));

    alert('Conta criada com sucesso!');
    this.router.navigate(['/login']);
  }
}
