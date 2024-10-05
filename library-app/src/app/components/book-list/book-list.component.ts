// book-list.component.ts (Updated with loading)
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BorrowBookDialogComponent } from '../borrow-book-dialog/borrow-book-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'isbn', 'publisher', 'edition', 'total_quantity', 'available_quantity', 'categories', 'actions'];
  isLoading = false;
  authService: any;

  constructor(
    private dialog: MatDialog,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
        this.isLoading = false;
      },
      err => {
        this.snackBar.open('Failed to load books', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }
  isStaff(): boolean {
    const role = this.authService.getUserRole();
    return role === 'staff' || role === 'admin';
  }
  
  borrowBook(book: Book) {
    const dialogRef = this.dialog.open(BorrowBookDialogComponent, {
      width: '300px',
      data: { bookId: book.id, bookTitle: book.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.snackBar.open(`Borrowed ${book.title}`, 'Close', { duration: 3000 });
        this.loadBooks();
      }
    });
  }
  addBook() {
    this.router.navigate(['/add-book']);
  }

  editBook(book: Book) {
    this.router.navigate(['/edit-book', book.id]);
  }

  viewBook(book: Book) {
    this.router.navigate(['/book-detail', book.id]);
  }
  openBorrowDialog() {
    const dialogRef = this.dialog.open(BorrowBookDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks(); // Refresh the book list after successful borrowing
      }
    });
  }
}