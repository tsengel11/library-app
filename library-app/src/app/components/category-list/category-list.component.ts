// category-list.component.ts (Extended)
import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
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

  addCategory() {
    this.router.navigate(['/categories/add']);
  }

  deleteCategory(category: Category) {
    if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      this.categoryService.deleteCategory(category.id!).subscribe(
        res => {
          this.snackBar.open('Category deleted successfully!', 'Close', { duration: 3000 });
          this.loadCategories();
        },
        err => this.snackBar.open('Failed to delete category', 'Close', { duration: 3000 })
      );
    }
  }

}