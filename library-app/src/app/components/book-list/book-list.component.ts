// src/app/components/book-list/book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BorrowBookDialogComponent } from '../borrow-book-dialog/borrow-book-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'isbn', 'publisher', 'edition', 'available_quantity', 'actions'];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      err => this.snackBar.open('Failed to load books', 'Close', { duration: 3000 })
    );
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

  // Implement other actions like returnBook, editBook, deleteBook as needed
}