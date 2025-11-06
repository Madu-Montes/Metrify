import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

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
  form: any;

  constructor(private fb: FormBuilder, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      busto: ['', Validators.required],
      torax: ['', Validators.required],
      cintura: ['', Validators.required],
      quadril: ['', Validators.required],
      coxa: ['', Validators.required],
      calcado: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const medidas = this.form.value;
    localStorage.setItem('metrify_medidas', JSON.stringify(medidas));
    alert('Medidas salvas com sucesso!');
    this.router.navigate(['/dashboard']);
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }
}
