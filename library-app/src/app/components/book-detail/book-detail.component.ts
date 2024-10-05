// book-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookId: number | null = null;
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      this.loadBook(this.bookId);
    } else {
      this.snackBar.open('Invalid book ID', 'Close', { duration: 3000 });
      this.router.navigate(['/books']);
    }
  }

  loadBook(id: number) {
    this.bookService.getBooks().subscribe(
      books => {
        this.book = books.find(b => b.id === id);
        if (!this.book) {
          this.snackBar.open('Book not found', 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        }
      },
      err => this.snackBar.open('Failed to load book', 'Close', { duration: 3000 })
    );
  }

  goBack() {
    this.router.navigate(['/books']);
  }
}