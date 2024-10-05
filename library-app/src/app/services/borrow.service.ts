// borrow.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Borrow {
  id?: number;
  user_id: number;
  book_id: number;
  reserve_date?: string; // ISO date string
  due_date?: string;     // ISO date string
  return_date?: string;  // ISO date string
  is_returned?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  private borrowUrl = 'http://localhost:8000/borrow/';
  private returnUrl = 'http://localhost:8000/return/';

  constructor(private http: HttpClient) { }

  borrowBook(borrow: Borrow): Observable<Borrow> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Borrow>(this.borrowUrl, borrow, { headers });
  }

  returnBook(borrowId: number): Observable<Borrow> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<Borrow>(`${this.returnUrl}${borrowId}`, {}, { headers });
  }

  getBorrows(): Observable<Borrow[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Borrow[]>(this.borrowUrl, { headers });
  }
}