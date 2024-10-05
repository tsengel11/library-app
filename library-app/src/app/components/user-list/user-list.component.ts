// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'address', 'phone_number', 'role', 'status', 'actions'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      err => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    );
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }

  editUser(user: User) {
    this.router.navigate([`/users/edit/${user.id}`]);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      this.userService.deleteUser(user.id!).subscribe(
        res => {
          this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        err => this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 })
      );
    }
  }

}