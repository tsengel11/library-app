// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import {jwtDecode} from "jwt-decode"; // Adjusted import
import { StorageService } from './storage.service';

export interface User {
  id?: number;
  username: string;
  password?: string;
  role: string;
  first_name: string;
  last_name: string;
  address?: string;
  phone_number?: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8000/token';
  private registerUrl = 'http://localhost:8000/users/';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private storage: StorageService) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(this.authUrl, body, { headers }).pipe(
      tap(res => {
        this.storage.setItem('token', res.access_token);
        this.storage.setItem('role', res.role); // Assuming the backend returns the user's role
        this.loggedIn.next(true);
      })
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }

  logout() {
    this.storage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  private hasToken(): boolean {
    return !!this.storage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.storage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.role || null;
      } catch (error) {
        console.error('Invalid token');
        return null;
      }
    }
    return null;
  }
}