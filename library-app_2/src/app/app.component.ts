// src/app/app.component.ts

import { Component, ViewChild } from '@angular/core';
import { NbSidebarComponent, NbMenuItem, NbSidebarService } from '@nebular/theme';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service'; // Adjust the path as necessary
import { RouterOutlet } from '@angular/router';
import { NebularModule } from './nebular.module';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NebularModule,AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Your Application Title';

  @ViewChild('sidebar') sidebar!: NbSidebarComponent;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems: NbMenuItem[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private sidebarService: NbSidebarService
  ) {
    this.initializeMenuItems();
  }

  initializeMenuItems(): void {
    const userRoles = this.authService.getUserRole(); // Implement this method based on your AuthService

    this.menuItems = [
      {
        title: 'Books',
        icon: 'book-outline',
        link: '/books',
        hidden: !this.hasRole(['admin', 'staff', 'user']),
      },
      {
        title: 'Add Book',
        icon: 'plus-outline',
        link: '/add-book',
        hidden: !this.hasRole(['admin', 'staff']),
      },
      {
        title: 'Categories',
        icon: 'list-outline',
        link: '/categories',
        hidden: !this.hasRole(['admin', 'staff']),
      },
      {
        title: 'Borrow Book',
        icon: 'arrow-circle-down-outline',
        link: '/borrow-book',
        hidden: !this.hasRole(['staff']),
      },
      // Add more links as needed
    ];
  }

  hasRole(allowedRoles: string[]): boolean {
    const userRoles = this.authService.getUserRole(); // Implement this method
    return allowedRoles.some(role => userRoles?.includes(role) ?? false);
  }

  toggleSidebar(): void {
    this.sidebar.toggle(true);
  }

  logout(): void {
    this.authService.logout();
    // Navigate to login or perform other logout operations
  }
}