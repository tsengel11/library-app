// borrow-add.component.ts (Updated for Barcode Scanner)
import { Component, OnInit } from '@angular/core';
import { BorrowService, Borrow } from '../../services/borrow.service';
import { BookService, Book } from '../../services/book.service';
import { UserService, User } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow-add',
  templateUrl: './borrow-add.component.html',
  styleUrls: ['./borrow-add.component.css']
})
export class BorrowAddComponent implements OnInit {

  borrow: Borrow = {
    user_id: 0,
    book_id: 0,
    reserve_date: '',
    due_date: '',
    return_date: '',
    is_returned: false
  };

  users: User[] = [];
  books: Book[] = [];
  scannedBarcode: string = '';

  constructor(
    private borrowService: BorrowService,
    private bookService: BookService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadBooks();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      err => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    );
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      err => this.snackBar.open('Failed to load books', 'Close', { duration: 3000 })
    );
  }

  handleBarcodeResult(result: string) {
    this.scannedBarcode = result;
    this.scanBarcode();
  }

  scanBarcode() {
    const book = this.books.find(b => b.isbn === this.scannedBarcode);
    if (book && book.available_quantity > 0) {
      this.borrow.book_id = book.id!;
      this.borrow.due_date = this.calculateDueDate();
      this.snackBar.open(`Book "${book.title}" selected`, 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Book not found or unavailable', 'Close', { duration: 3000 });
    }
  }

  calculateDueDate(): string {
    const today = new Date();
    const due = new Date(today);
    due.setDate(due.getDate() + 14); // 2 weeks due date
    return due.toISOString().split('T')[0];
  }

  borrowBook() {
    this.borrowService.borrowBook(this.borrow).subscribe(
      res => {
        this.snackBar.open('Book borrowed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/borrows']);
      },
      err => {
        this.snackBar.open('Failed to borrow book', 'Close', { duration: 3000 });
      }
    );
  }

}