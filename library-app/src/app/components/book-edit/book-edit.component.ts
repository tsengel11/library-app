// book-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../../services/book.service';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    edition: '',
    total_quantity: 1,
    available_quantity: 1,
    categories: []
  };

  categories: Category[] = [];
  selectedCategories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook(bookId);
    this.loadCategories();
  }

  loadBook(id: number) {
    this.bookService.getBooks().subscribe(
      data => {
        const foundBook = data.find(b => b.id === id);
        if (foundBook) {
          this.book = foundBook;
          this.selectedCategories = foundBook.categories || [];
        } else {
          this.snackBar.open('Book not found', 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        }
      },
      err => this.snackBar.open('Failed to load book details', 'Close', { duration: 3000 })
    );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      err => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    );
  }

  updateBook() {
    this.book.categories = this.selectedCategories;
    this.bookService.updateBook(this.book).subscribe(
      res => {
        this.snackBar.open('Book updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/books']);
      },
      err => {
        this.snackBar.open('Failed to update book', 'Close', { duration: 3000 });
      }
    );
  }

}