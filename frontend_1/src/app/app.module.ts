// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { BorrowBookDialogComponent } from './components


import { NgxBarcodeScannerModule } from 'ngx-barcode-scanner';


@NgModule({
    exports: [
      // ... other modules
      NgxBarcodeScannerModule
    ]
  })
  export class MaterialModule { }