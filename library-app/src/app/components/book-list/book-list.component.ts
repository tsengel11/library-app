// book-list.component.ts (Updated with loading)
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
  displayedColumns: string[] = ['title', 'author', 'isbn', 'publisher', 'edition', 'total_quantity', 'available_quantity', 'categories', 'actions'];
  isLoading = false;

  constructor(
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

  addBook() {
    this.router.navigate(['/add-book']);
  }

  editBook(book: Book) {
    this.router.navigate(['/edit-book', book.id]);
  }

  viewBook(book: Book) {
    this.router.navigate(['/book-detail', book.id]);
  }
}