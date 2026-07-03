import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  goal: string;
  lastAppointment: string;
  status: string;
}

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './patients-table.html',
  styleUrl: './patients-table.css'
})
export class PatientsTable {

  @Input()
  patients: Patient[] = [];

  displayedColumns = [
    'name',
    'age',
    'gender',
    'phone',
    'goal',
    'lastAppointment',
    'status'
  ];

}
