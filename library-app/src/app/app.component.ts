// src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule without forRoot
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Library Management</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/users">Users</button>
      <button mat-button routerLink="/books">Books</button>
      <button mat-button routerLink="/borrows">Borrows</button>
      <button mat-button routerLink="/categories">Categories</button>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      mat-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
      }
      router-outlet {
        margin-top: 64px; /* Height of the toolbar */
        display: block;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Import RouterModule without forRoot
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}