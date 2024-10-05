// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService, User } from './services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch current user details using the token (username)
      // Assuming the token is the username for simplicity
      this.userService.getUsers().subscribe(users => {
        const user = users.find(u => u.username === token);
        if (user) {
          this.currentUser = user;
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get isStaff(): boolean {
    return this.currentUser?.role === 'staff';
  }

  get isStaffOrAdmin(): boolean {
    return this.isStaff || this.isAdmin;
  }
}