import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      busto: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      torax: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      cintura: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      quadril: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      coxa: ['', [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
     calçado: ['', [Validators.pattern(/^\d{1,2}$/)]],
    });

    const medidasSalvas = localStorage.getItem('metrify_medidas');
    if (medidasSalvas) {
      this.form.patchValue(JSON.parse(medidasSalvas));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const medidas = this.form.value;
    localStorage.setItem('metrify_medidas', JSON.stringify(medidas));

    alert('Medidas salvas com sucesso!');
    this.router.navigate(['/dashboard']);
  }

  onInputNumber(event: any, field: string): void {
  const input = event.target as HTMLInputElement;
  const maxLength = field === 'calçado' ? 2 : 3;
  const numericValue = input.value.replace(/\D/g, '');
  this.form.get(field)?.setValue(input.value);
}

  cancelar(): void {
    this.location.back();
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

}
