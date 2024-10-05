// category-form.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  isEditMode = false;
  categoryId: number | null = null;
  category = {
    name: '',
    description: ''
  };

  errorMessage = '';

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: number) {
    this.bookService.getCategories().subscribe(
      categories => {
        const found = categories.find(c => c.id === id);
        if (found) {
          this.category = found;
        } else {
          this.snackBar.open('Category not found', 'Close', { duration: 3000 });
          this.router.navigate(['/categories']);
        }
      },
      err => this.snackBar.open('Failed to load category', 'Close', { duration: 3000 })
    );
  }

  submit() {
    if (this.isEditMode && this.categoryId) {
      // Implement update category functionality
      this.bookService.updateCategory(this.categoryId, this.category).subscribe(
        res => {
          this.snackBar.open('Category updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/categories']);
        },
        err => this.snackBar.open('Failed to update category', 'Close', { duration: 3000 })
      );
    } else {
      this.bookService.addCategory(this.category).subscribe(
        res => {
          this.snackBar.open('Category added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/categories']);
        },
        err => this.snackBar.open('Failed to add category', 'Close', { duration: 3000 })
      );
    }
  }
}