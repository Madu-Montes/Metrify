import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegisterUser {
  registerForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      console.log('Formulário enviado:', this.registerForm.value);
      alert('Cadastro realizado com sucesso!');
      this.registerForm.reset();
      this.formSubmitted = false;
    } else {
      console.log('Formulário inválido');
      alert('Preencha todos os campos corretamente!');
    }
  }

  getControl(controlName: string) {
    return this.registerForm.get(controlName);
  }
}
