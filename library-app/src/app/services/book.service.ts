// book.service.ts
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
  categories?: string[]; // Array of category names
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:8000/books/';

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

  updateBook(book: Book): Observable<Book> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Book>(`${this.booksUrl}${book.id}/`, book, { headers });
  }

  deleteBook(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.booksUrl}${id}/`, { headers });
  }
}