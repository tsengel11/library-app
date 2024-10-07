import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../../services/library-api/api/users.service';
import { User } from '../../services/library-api/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip'; // Optional, if used
import { MatDialogModule } from '@angular/material/dialog'; // Optional, if used

import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTooltipModule, // Optional
    MatDialogModule, // Optional
  ],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;
  errorMessage: string | null = null;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  /**
   * Fetches the list of users from the backend and initializes the table data source.
   */
  fetchUsers(): void {
    this.userService.readUsersUsersGet().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to load users. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Navigates to the user creation form.
   */
  addUser(): void {
    this.router.navigate(['/users/create']);
  }

  /**
   * Navigates to the user edit form for the specified user.
   * @param user - The user to edit.
   */
  editUser(user: User): void {
    this.router.navigate(['/users', 'edit', user.id]);
  }

  /**
   * Deletes the specified user after confirmation.
   * @param user - The user to delete.
   */
  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      // this.userService.deleteUser(user.id).subscribe({
      //   next: () => {
      //     // Remove the user from the data source
      //     this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
      //   },
      //   error: (error) => {
      //     console.error('Error deleting user:', error);
      //     alert('Failed to delete user. Please try again.');
      //   },
      // });
    }
  }

  /**
   * Applies a filter to the table data based on the input value.
   * @param event - The input event containing the filter value.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset to the first page if the filter changes
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}