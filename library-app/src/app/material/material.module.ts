// src/app/material/material.module.ts

import { NgModule } from '@angular/core';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';         // For mat-select and mat-option
import { MatFormFieldModule } from '@angular/material/form-field';  // For mat-form-field and mat-error
import { MatInputModule } from '@angular/material/input';           // For matInput directive
import { MatCardModule } from '@angular/material/card';             // For mat-card and mat-card-footer
import { MatSnackBarModule } from '@angular/material/snack-bar';    // For MatSnackBar
import { MatDialogModule } from '@angular/material/dialog';          // For MatDialog

// Add other Angular Material modules as needed

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    // Add other Angular Material modules here
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    // Export the same modules
  ]
})
export class MaterialModule { }