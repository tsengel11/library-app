// book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'isbn', 'publisher', 'edition', 'total_quantity', 'available_quantity', 'actions'];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router
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

  addBook() {
    this.router.navigate(['/books/add']);
  }

  editBook(book: Book) {
    this.router.navigate([`/books/edit/${book.id}`]);
  }

  deleteBook(book: Book) {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.bookService.deleteBook(book.id!).subscribe(
        res => {
          this.snackBar.open('Book deleted successfully!', 'Close', { duration: 3000 });
          this.loadBooks();
        },
        err => this.snackBar.open('Failed to delete book', 'Close', { duration: 3000 })
      );
    }
  }
}