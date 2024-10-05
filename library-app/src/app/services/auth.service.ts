// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterUser {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  address?: string;
  phone_number?: string;
  role: 'user' | 'staff' | 'admin';
  status: 'active' | 'deactive';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8000';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(`${this.authUrl}/token`, body, { headers });
  }

  registerUser(user: RegisterUser): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/users/`, user);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    // Optionally, navigate to login page
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}