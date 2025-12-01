import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  form: any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      measurements: this.fb.group({
        busto: [''],
        torax: [''],
        cintura: [''],
        quadril: [''],
        coxa: [''],
        calcado: ['']
      }),
    });
  }
  cancelar(): void {
    this.router.navigate(['/login']);
  }

  verCodigoAcesso(): void {
    this.router.navigate(['/dashboard']);
    console.log('Navegando para o Dashboard...');
  }

  onInputNumber(event: Event, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    value = value.replace(/[^0-9.]/g, '');
    inputElement.value = value;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.api.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Erro no register:', err),
    });
  }
}
