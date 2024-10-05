// borrow-book-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowService } from '../../services/borrow.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-borrow-book-dialog',
  templateUrl: './borrow-book-dialog.component.html',
  styleUrls: ['./borrow-book-dialog.component.css']
})
export class BorrowBookDialogComponent {

  users = []; // List of users fetched from the backend
  selectedUserId: number;
  scannedBarcode: string;
  dueDate: Date;

  constructor(
    public dialogRef: MatDialogRef<BorrowBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private borrowService: BorrowService,
    private snackBar: MatSnackBar
  ) {
    this.fetchUsers();
  }

  fetchUsers() {
    // Implement a service to fetch users from the backend
    // Assume UserService is already implemented
    // this.userService.getUsers().subscribe(users => this.users = users);
  }

  onScanBarcode() {
    // Implement barcode scanning logic here
    // For now, we'll simulate barcode scanning
    this.scannedBarcode = '1234567890'; // Example barcode
  }

  onBorrow() {
    const borrowData = {
      user_id: this.selectedUserId,
      book_barcode: this.scannedBarcode,
      due_date: this.dueDate
    };

    this.borrowService.borrowBook(borrowData).subscribe(
      res => {
        this.snackBar.open('Book borrowed successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      err => {
        this.snackBar.open('Failed to borrow book.', 'Close', { duration: 3000 });
      }
    );
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}