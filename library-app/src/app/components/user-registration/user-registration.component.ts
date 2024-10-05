// user-registration.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {

  user = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    role: 'user', // default role
    status: 'active' // default status
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  register() {
    this.authService.registerUser(this.user).subscribe(
      res => {
        this.snackBar.open('User registered successfully!', 'Close', { duration: 3000 });
        // Optionally, reset the form or navigate to another page
        this.resetForm();
      },
      err => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    );
  }

  resetForm() {
    this.user = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      address: '',
      phone_number: '',
      role: 'user',
      status: 'active'
    };
  }
}