// src/app/users/user-create/user-create.component.ts

import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService, UserCreate } from '../../services/library-api/api/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserCreateComponent {
  userForm = this.fb.group({
    username: ['', Validators.required],
    role: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', Validators.required],
    address: [''],
    phone_number: [''],
    status: ['active'],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  onSubmit() {
    // if (this.userForm.valid) {
    //   const user: UserCreate = this.userForm.value;
    //   this.userService.createUser(user).subscribe({
    //     next: () => this.router.navigate(['/users']),
    //     error: (err: any) => console.error(err),
    //   });
    // }
  }
}