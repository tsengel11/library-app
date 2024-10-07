// src/app/components/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NbAlertModule, NbIconModule, NbToastrService } from '@nebular/theme'; // Using Nebular's ToastrService
import {jwtDecode} from 'jwt-decode';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NebularModule } from '../../nebular.module';
import { NbFormFieldModule, NbInputModule, NbButtonModule, NbCardModule } from '@nebular/theme';

//import { MaterialModule } from '../../material/material.module'; // Adjust the path as necessary

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule,NbAlertModule,NbIconModule,NbCardModule,NbFormFieldModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService, // Using Nebular's ToastrService
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      this.toastrService.danger(this.errorMessage, 'Error');
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      res => {
        // Save token using StorageService
        this.storage.setItem('token', res.access_token);
        this.authService.setLoggedIn(true);

        // Decode token to get user role
        const decoded: any = jwtDecode(res.access_token);
        const userRole = decoded.role;

        // Navigate based on role
        if (userRole === 'admin' || userRole === 'staff') {
          this.router.navigate(['/books']);
        } else {
          this.router.navigate(['/books']);
        }
      },
      err => {
        this.errorMessage = 'Invalid username or password';
        this.toastrService.danger(this.errorMessage, 'Error');
      }
    );
  }
}