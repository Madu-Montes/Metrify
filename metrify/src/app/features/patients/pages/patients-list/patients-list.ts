import { Component } from '@angular/core';
import { Patient, PatientsTable } from '../../components/patients-table/patients-table';
import { MatIcon } from '@angular/material/icon';
import { AddPatientModal } from '../../modals/add-patient-modal/add-patient-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [PatientsTable, MatIcon],
  templateUrl: './patients-list.html',
  styleUrl: './patients-list.css',
})
export class PatientsList {
  constructor(private dialog: MatDialog) {}

  patients: Patient[] = [
    {
      id: 1,
      name: 'Maria Silva',
      age: 32,
      gender: 'fem',
      phone: '(11) 99999-9999',
      goal: 'Weight loss',
      lastAppointment: '12/07/2026',
      status: 'Active',
    },
    {
      id: 2,
      name: 'João Souza',
      age: 45,
      gender: 'male',
      phone: '(11) 98888-8888',
      goal: 'Muscle gain',
      lastAppointment: '15/07/2026',
      status: 'Inactive',
    },
    {
      id: 1,
      name: 'Maria Silva',
      age: 32,
      gender: 'fem',
      phone: '(11) 99999-9999',
      goal: 'Weight loss',
      lastAppointment: '12/07/2026',
      status: 'Active',
    },
    {
      id: 1,
      name: 'Maria Silva',
      age: 32,
      gender: 'fem',
      phone: '(11) 99999-9999',
      goal: 'Weight loss',
      lastAppointment: '12/07/2026',
      status: 'Active',
    },
  ];

  addPatient() {
    this.dialog.open(AddPatientModal, {
      width: '750px',
    });
  }
}
