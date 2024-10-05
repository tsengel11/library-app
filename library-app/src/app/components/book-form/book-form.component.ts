// book-form.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  isEditMode = false;
  bookId: number | null = null;
  book: Book = {
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    edition: '',
    total_quantity: 0,
    available_quantity: 0,
    categories: []
  };

  categories: any[] = [];
  selectedCategories: string[] = [];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      this.isEditMode = true;
      this.loadBook(this.bookId);
    }
    this.loadCategories();
  }

  loadBook(id: number) {
    this.bookService.getBooks().subscribe(
      books => {
        const found = books.find(b => b.id === id);
        if (found) {
          this.book = found;
          this.selectedCategories = found.categories || [];
        } else {
          this.snackBar.open('Book not found', 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        }
      },
      err => this.snackBar.open('Failed to load book', 'Close', { duration: 3000 })
    );
  }

  loadCategories() {
    this.bookService.getCategories().subscribe(
      data => this.categories = data,
      err => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    );
  }

  submit() {
    this.book.categories = this.selectedCategories;
    if (this.isEditMode && this.bookId) {
      this.bookService.updateBook(this.book).subscribe(
        res => {
          this.snackBar.open('Book updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        },
        err => this.snackBar.open('Failed to update book', 'Close', { duration: 3000 })
      );
    } else {
      this.bookService.addBook(this.book).subscribe(
        res => {
          this.snackBar.open('Book added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        },
        err => this.snackBar.open('Failed to add book', 'Close', { duration: 3000 })
      );
    }
  }
}