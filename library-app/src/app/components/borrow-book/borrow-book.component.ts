// borrow-book.component.ts
import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../../services/borrow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  userId: number | null = null;
  bookBarcode: string = '';
  dueDate: Date | null = null;

  constructor(
    private borrowService: BorrowService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize any required data
  }

  onCodeResult(resultString: string) {
    this.bookBarcode = resultString;
    this.snackBar.open(`Scanned Barcode: ${resultString}`, 'Close', { duration: 2000 });
  }

  borrowBook() {
    if (!this.userId || !this.bookBarcode) {
      this.snackBar.open('Please enter User ID and scan Book Barcode', 'Close', { duration: 3000 });
      return;
    }

    // Decode barcode to get book ID
    const bookId = this.decodeBarcode(this.bookBarcode);
    if (!bookId) {
      this.snackBar.open('Invalid Barcode', 'Close', { duration: 3000 });
      return;
    }

    // Set due date (e.g., 14 days from today)
    const today = new Date();
    this.dueDate = new Date();
    this.dueDate.setDate(today.getDate() + 14);

    const borrowData = {
      user_id: this.userId,
      book_id: bookId,
      reserve_date: today.toISOString().split('T')[0],
      due_date: this.dueDate.toISOString().split('T')[0]
    };

    this.borrowService.borrowBook(borrowData).subscribe(
      res => {
        this.snackBar.open('Book borrowed successfully!', 'Close', { duration: 3000 });
        this.resetForm();
      },
      err => {
        this.snackBar.open(err.error.detail || 'Failed to borrow book', 'Close', { duration: 3000 });
      }
    );
  }

  decodeBarcode(barcode: string): number | null {
    // Implement barcode decoding logic
    // For simplicity, assume barcode is the book ID as a string
    const id = Number(barcode);
    return isNaN(id) ? null : id;
  }

  resetForm() {
    this.userId = null;
    this.bookBarcode = '';
    this.dueDate = null;
  }

  goBack() {
    this.router.navigate(['/books']);
  }
}