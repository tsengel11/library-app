// category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.bookService.getCategories().subscribe(
      data => this.categories = data,
      err => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    );
  }

  addCategory() {
    this.router.navigate(['/add-category']);
  }

  editCategory(category: any) {
    this.router.navigate(['/edit-category', category.id]);
  }
}