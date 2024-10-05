// src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

// Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTP Module
import { HttpClientModule } from '@angular/common/http';

// Routing Module

// Root Component
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/book-add/book-add.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { BorrowBookDialogComponent } from './components/borrow-book-dialog/borrow-book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookListComponent,
    AddBookComponent,
    UserRegistrationComponent,
    BorrowBookDialogComponent,
    // Add other components here if you have more
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Required for Angular Material animations
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Required for making HTTP requests
    MaterialModule, // Custom module where you import Angular Material components
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }