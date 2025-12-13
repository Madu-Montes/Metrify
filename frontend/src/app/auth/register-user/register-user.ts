import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
})
export class RegisterUser {
  registerForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
  if (this.registerForm.invalid) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  const { name, email, password, confirmPassword } = this.registerForm.value;

  if (password !== confirmPassword) {
    alert('Senhas não coincidem');
    return;
  }

  this.authService.register(name.trim(), email.trim(), password).subscribe({
    next: (res: any) => {
      alert('Cadastro realizado com sucesso!');

      const userData = {
        name: name.trim(),
        email: email.trim(),
        accessCode: res.accessCode,
      };
      localStorage.setItem('metrify_user', JSON.stringify(userData));

      this.registerForm.reset();
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      console.error(err);
      alert('Erro no cadastro: ' + (err.error?.message || 'Erro desconhecido'));
    },
  });
}

  getControl(controlName: string) {
    return this.registerForm.get(controlName);
  }
}
