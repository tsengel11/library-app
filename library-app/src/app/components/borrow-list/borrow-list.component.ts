// borrow-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BorrowService, Borrow } from '../../services/borrow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss']
})
export class BorrowListComponent implements OnInit {

  borrows: Borrow[] = [];
  displayedColumns: string[] = ['user_id', 'book_id', 'reserve_date', 'due_date', 'return_date', 'is_returned', 'actions'];

  constructor(
    private borrowService: BorrowService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBorrows();
  }

  loadBorrows() {
    this.borrowService.getBorrows().subscribe(
      data => this.borrows = data,
      err => this.snackBar.open('Failed to load borrow records', 'Close', { duration: 3000 })
    );
  }

  returnBook(borrow: Borrow) {
    if (borrow.is_returned) {
      this.snackBar.open('Book already returned', 'Close', { duration: 3000 });
      return;
    }

    if (confirm(`Mark book ID ${borrow.book_id} as returned?`)) {
      this.borrowService.returnBook(borrow.id!).subscribe(
        res => {
          this.snackBar.open('Book returned successfully!', 'Close', { duration: 3000 });
          this.loadBorrows();
        },
        err => this.snackBar.open('Failed to return book', 'Close', { duration: 3000 })
      );
    }
  }

}