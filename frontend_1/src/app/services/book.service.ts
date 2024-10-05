// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  edition?: string;
  total_quantity: number;
  available_quantity?: number;
  categories: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:8000/books/';
  private categoriesUrl = 'http://localhost:8000/categories/';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Book[]>(this.booksUrl, { headers });
  }

  addBook(book: Book): Observable<Book> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Book>(this.booksUrl, book, { headers });
  }

  getCategories(): Observable<string[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<string[]>(this.categoriesUrl, { headers });
  }

  // Implement other methods like updateBook, deleteBook as needed
}