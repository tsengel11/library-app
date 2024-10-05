// src/app/components/category-management/category-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  categories: Category[] = [];
  addCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { 
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      err => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    );
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      const newCategory: Category = {
        ...this.addCategoryForm.value
      };
      this.categoryService.addCategory(newCategory).subscribe(
        res => {
          this.snackBar.open('Category added successfully!', 'Close', { duration: 3000 });
          this.addCategoryForm.reset();
          this.loadCategories();
        },
        err => {
          this.snackBar.open('Failed to add category.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}