// category-add.component.ts
import { Component } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {

  category: Category = {
    name: '',
    description: ''
  };

  errorMessage = '';

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  addCategory() {
    this.categoryService.addCategory(this.category).subscribe(
      res => {
        this.snackBar.open('Category added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/categories']);
      },
      err => {
        this.errorMessage = 'Failed to add category';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    );
  }

}