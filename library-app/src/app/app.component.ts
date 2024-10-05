// app.component.ts (Updated)
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'library-app';
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.updateUserRole();

    this.authService.isLoggedIn().subscribe(loggedIn => {
      if (!loggedIn) {
        this.userRole = null;
      } else {
        this.updateUserRole();
      }
    });
  }

  updateUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userRole = decoded.role;
      } catch (error) {
        console.error('Invalid token');
      }
    }
  }

  hasRole(expectedRoles: string[]): boolean {
    if (!this.userRole) return false;
    return expectedRoles.includes(this.userRole);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}