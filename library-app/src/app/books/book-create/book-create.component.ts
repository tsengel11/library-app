// src/app/books/book-create/book-create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BooksService, Book, CategoriesService } from '../../services/library-api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BookCreate, Category } from '../../services/library-api';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class BookCreateComponent implements OnInit {
  categories: Category[] = [];

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    isbn: ['', Validators.required],
    publisher: [''],
    edition: [''],
    barcode: ['', Validators.required],
    total_quantity: [0, [Validators.required, Validators.min(1)]],
    categories: [[]],
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BooksService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch categories for selection
    // Assume CategoryService is available
    this.categoryService.readCategoriesCategoriesGet().subscribe({
      next: (cats) => this.categories = cats,
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;
      const book: BookCreate = {
        title: formValue.title ?? '',
        author: formValue.author ?? '',
        isbn: formValue.isbn ?? '',
        publisher: formValue.publisher ?? '',
        edition: formValue.edition ?? '',
        barcode: formValue.barcode ?? '',
        total_quantity: formValue.total_quantity ?? 0,
      };
      
      this.bookService.createBookBooksPost(book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error(err),
      });
    }
  }}