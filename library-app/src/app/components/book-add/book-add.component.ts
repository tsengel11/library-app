// src/app/components/add-book/add-book.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;
  categories: string[] = [];
  selectedCategories: string[] = [];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { 
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publisher: [''],
      edition: [''],
      total_quantity: [1, [Validators.required, Validators.min(1)]],
      categories: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.bookService.getCategories().subscribe(
      data => this.categories = data,
      err => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    );
  }

  addBook() {
    if (this.addBookForm.valid) {
      const newBook: Book = {
        ...this.addBookForm.value
      };
      this.bookService.addBook(newBook).subscribe(
        res => {
          this.snackBar.open('Book added successfully!', 'Close', { duration: 3000 });
          this.addBookForm.reset({ total_quantity: 1, role: 'user', status: 'active' });
        },
        err => {
          this.snackBar.open('Failed to add book.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}