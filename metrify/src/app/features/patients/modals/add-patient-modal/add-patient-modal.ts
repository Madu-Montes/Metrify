import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-patient-modal',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './add-patient-modal.html',
  styleUrl: './add-patient-modal.css',
})
export class AddPatientModal {
  private readonly dialogRef = inject(MatDialogRef<AddPatientModal>);

  private readonly fb = inject(FormBuilder);

  patientForm = this.fb.group({
    name: ['', Validators.required],
    age: [null, Validators.required],
    gender: ['', Validators. required],
    phone: ['', Validators. required],
    email: ['', [Validators.required, Validators.email]],
    goal: [''],
    status: ['Active']
  });

  onClickClose() {
    this.dialogRef.close();
  }

  save() {
  if (this.patientForm.invalid) {
    return;
  }
  console.log(this.patientForm.value);

}
}
