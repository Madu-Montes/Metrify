import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe, HeaderComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  form: any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      measurements: this.fb.group({
        busto: [''],
        torax: [''],
        cintura: [''],
        quadril: [''],
        coxa: [''],
        calcado: [''],
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

    const medidas = this.form.value.measurements;

    this.api.saveMeasures(medidas).subscribe({
      next: (res) => {
        console.log('Medidas salvas:', res);

        // salvar no localStorage num formato padronizado
        const medidasArray = Object.keys(medidas).map((key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          valor: medidas[key],
        }));

        localStorage.setItem('metrify_medidas', JSON.stringify(medidasArray));

        // navega pro dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao salvar medidas:', err);
      },
    });
  }
}
