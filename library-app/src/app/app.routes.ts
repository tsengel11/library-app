// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
// import { BookListComponent } from './books/book-list/book-list.component';
// import { BookCreateComponent } from './books/book-create/book-create.component';
// import { BorrowListComponent } from './borrows/borrow-list/borrow-list.component';
// import { BorrowCreateComponent } from './borrows/borrow-create/borrow-create.component';
// import { CategoryListComponent } from './categories/category-list/category-list.component';
// import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/create',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
  },
//   {
//     path: 'books',
//     component: BookListComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'books/create',
//     component: BookCreateComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'borrows',
//     component: BorrowListComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'borrows/create',
//     component: BorrowCreateComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'categories',
//     component: CategoryListComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'categories/create',
//     component: CategoryCreateComponent,
//     canActivate: [AuthGuard],
//   },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];