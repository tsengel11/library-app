// src/app/components/user-registration/user-registration.component.ts
import { Component } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {

  user: User = {
    username: '',
    password: '',
    role: 'user', // default role
    first_name: '',
    last_name: '',
    status: 'active' // default status
  };

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  register() {
    this.authService.registerUser(this.user).subscribe(
      res => {
        this.snackBar.open('User registered successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']); // Navigate to login or another page
      },
      err => {
        this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }
}