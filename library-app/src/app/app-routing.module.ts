// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { BorrowBookComponent } from './components/borrow-book/borrow-book.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'books/create', component: BookCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'staff'] } },
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'categories/create', component: CategoryCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'borrow', component: BorrowBookComponent, canActivate: [AuthGuard], data: { roles: ['staff'] } },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }