// src/app/books/book-list/book-list.component.ts

import { Component, OnInit } from '@angular/core';
import { BooksService, Book } from '../../services/library-api/api/books.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: true,
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'isbn', 'publisher', 'actions'];
  dataSource = new MatTableDataSource<Book>();

  constructor(private bookService: BooksService) {}

  ngOnInit() {
    this.bookService.readBooksBooksGet().subscribe({
      next: (books) => this.dataSource.data = books,
      error: (err) => console.error(err),
    });
  }

  // Additional methods for edit, delete can be added here
}