// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { BorrowBookComponent } from './components/borrow-book/borrow-book.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'add-book', component: BookFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-book/:id', component: BookFormComponent, canActivate: [AuthGuard] },
  { path: 'book-detail/:id', component: BookDetailComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'add-category', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-category/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'borrow-book', component: BorrowBookComponent, canActivate: [AuthGuard] },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }