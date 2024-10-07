// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Token } from '../services/library-api/model/token';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Import environment
import {jwtDecode} from 'jwt-decode';
import { StorageService } from './storage.service'; // Import StorageService

interface JwtPayload {
  exp: number;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root', // Ensures the service is available application-wide
})
export class AuthService {
  private tokenKey = 'auth_token'; // Key to store the token in localStorage
  private tokenSubject: BehaviorSubject<Token | null>;
  public token$: Observable<Token | null>;

  constructor(private http: HttpClient, private storageService: StorageService) {
    // Initialize tokenSubject with the token from localStorage if available
    const storedToken = this.getTokenFromStorage();
    this.tokenSubject = new BehaviorSubject<Token | null>(storedToken);
    this.token$ = this.tokenSubject.asObservable();
  }

  /**
   * Logs in the user by sending credentials to the backend.
   * Stores the token in localStorage upon successful login.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns An Observable of the authentication token.
   */
  login(username: string, password: string): Observable<Token> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http
      .post<Token>(`${environment.apiBaseUrl}/auth/token`, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((token: Token) => {
          this.storeToken(token); // Store token using StorageService
          this.tokenSubject.next(token); // Update BehaviorSubject
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Logs out the user by clearing the authentication token.
   * Removes the token from localStorage.
   */
  logout(): void {
    this.removeToken(); // Remove token using StorageService
    this.tokenSubject.next(null); // Update BehaviorSubject
    // Optionally, perform additional logout operations like redirecting
  }

  /**
   * Retrieves the current authentication token.
   * @returns The current Token or null if not authenticated.
   */
  getToken(): Token | null {
    return this.tokenSubject.value;
  }

  /**
   * Checks if the user is currently authenticated.
   * @returns True if authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      // Check if the token is expired
      return !this.isTokenExpired(token.access_token);
    }
    return false;
  }

  /**
   * Stores the authentication token using StorageService.
   * @param token - The authentication token to store.
   */
  private storeToken(token: Token): void {
    this.storageService.setItem(this.tokenKey, JSON.stringify(token));
  }

  /**
   * Retrieves the authentication token from StorageService.
   * @returns The Token object or null if not found.
   */
  private getTokenFromStorage(): Token | null {
    const tokenString = this.storageService.getItem(this.tokenKey);
    if (tokenString) {
      try {
        return JSON.parse(tokenString) as Token;
      } catch (error) {
        console.error('Error parsing token from storage:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Removes the authentication token using StorageService.
   */
  private removeToken(): void {
    this.storageService.removeItem(this.tokenKey);
  }

  /**
   * Checks if the JWT token is expired.
   * @param token - The JWT token string.
   * @returns True if expired, false otherwise.
   */
  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expirationDate = decoded.exp * 1000; // Convert to milliseconds
      return new Date().getTime() > expirationDate;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
}