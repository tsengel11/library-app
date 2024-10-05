// borrow-book.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BorrowService, Borrow } from '../../services/borrow.service';
import { UserService, User } from '../../services/user.service';
import { BookService, Book } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  users: User[] = [];
  selectedUserId: number | null = null;

  scannedBarcode: string = '';
  selectedBook: Book | null = null;

  dueDate: string = '';

  @ViewChild('barcodeInput') barcodeInput!: ElementRef;

  constructor(
    private borrowService: BorrowService,
    private userService: UserService,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      res => this.users = res,
      err => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    );
  }

  onBarcodeScanned() {
    if (this.scannedBarcode.trim() === '') {
      this.snackBar.open('Please scan a valid barcode', 'Close', { duration: 3000 });
      return;
    }

    // Fetch the book by ISBN (assuming barcode is ISBN)
    this.bookService.getBooks().subscribe(
      books => {
        const book = books.find(b => b.isbn === this.scannedBarcode);
        if (book) {
          if (book.available_quantity < 1) {
            this.snackBar.open('Book is not available for borrowing', 'Close', { duration: 3000 });
            this.selectedBook = null;
          } else {
            this.selectedBook = book;
            this.snackBar.open(`Book "${book.title}" selected`, 'Close', { duration: 3000 });
          }
        } else {
          this.snackBar.open('Book not found', 'Close', { duration: 3000 });
          this.selectedBook = null;
        }
        // Clear the barcode input for the next scan
        this.scannedBarcode = '';
        this.barcodeInput.nativeElement.focus();
      },
      err => {
        this.snackBar.open('Error fetching book details', 'Close', { duration: 3000 });
        this.selectedBook = null;
        this.scannedBarcode = '';
        this.barcodeInput.nativeElement.focus();
      }
    );
  }

  borrowBook() {
    if (!this.selectedUserId || !this.selectedBook || !this.dueDate) {
      this.snackBar.open('Please select a user, scan a book, and set a due date', 'Close', { duration: 3000 });
      return;
    }

    const borrow: Borrow = {
      user_id: this.selectedUserId,
      book_id: this.selectedBook.id!,
      reserve_date: new Date().toISOString().split('T')[0],
      due_date: this.dueDate
    };

    this.borrowService.borrowBook(borrow).subscribe(
      res => {
        this.snackBar.open(`Book "${this.selectedBook!.title}" borrowed successfully!`, 'Close', { duration: 3000 });
        // Reset the form
        this.selectedUserId = null;
        this.selectedBook = null;
        this.dueDate = '';
        this.barcodeInput.nativeElement.focus();
      },
      err => {
        this.snackBar.open('Failed to borrow book', 'Close', { duration: 3000 });
      }
    );
  }
}