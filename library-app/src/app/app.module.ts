// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './ material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/book-add/book-add.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { BorrowBookDialogComponent } from './components/borrow-book-dialog/borrow-book-dialog.component';