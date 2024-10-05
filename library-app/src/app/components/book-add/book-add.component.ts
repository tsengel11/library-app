// book-add.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  book: Book = {
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
    private bookService: BookService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      err => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    );
  }

  addBook() {
    this.book.categories = this.selectedCategories;
    this.bookService.addBook(this.book).subscribe(
      res => {
        this.snackBar.open('Book added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/books']);
      },
      err => {
        this.snackBar.open('Failed to add book', 'Close', { duration: 3000 });
      }
    );
  }

}