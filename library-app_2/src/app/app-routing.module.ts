// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { StaffGuard } from './guards/staff.guard';
import { AppComponent } from './app.component';
// import { BorrowBookDialogComponent } from './components/borrow-book-dialog/borrow-book-dialog.component';
// import { BookListComponent } from './components/book-list/book-list.component';
// import { BookFormComponent } from './components/book-form/book-form.component';
// import { BookDetailComponent } from './components/book-detail/book-detail.component';
// import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
// import { CategoryListComponent } from './components/category-list/category-list.component';
// import { CategoryFormComponent } from './components/category-form/category-form.component';
// import { BorrowBookComponent } from './components/borrow-book/borrow-book.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  // { path: 'register', component: UserRegistrationComponent },
  // { 
  //   path: 'books', 
  //   component: BookListComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['admin', 'staff', 'user'] }
  // },
  // { 
  //   path: 'add-book', 
  //   component: BookFormComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['admin', 'staff'] }
  // },
  // { 
  //   path: 'edit-book/:id', 
  //   component: BookFormComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['admin', 'staff'] }
  // },
  // { 
  //   path: 'categories', 
  //   component: CategoryListComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['admin', 'staff'] }
  // },
  // { 
  //   path: 'add-category', 
  //   component: CategoryFormComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['admin', 'staff'] }
  // },
  // { 
  //   path: 'edit-category/:id', 
  //   component: CategoryFormComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['admin', 'staff'] }
  // },
  // { 
  //   path: 'borrow-book', 
  //   component: BorrowBookComponent, 
  //   canActivate: [AuthGuard],
  //   data: { expectedRoles: ['staff'] }
  // },
  // { path: 'borrow', component: BorrowBookDialogComponent, canActivate: [StaffGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }