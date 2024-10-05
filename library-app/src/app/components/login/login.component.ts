// login.component.ts (Updated)
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      res => {
        // Save token and update login status
        localStorage.setItem('token', res.access_token);
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
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    );
  }
}