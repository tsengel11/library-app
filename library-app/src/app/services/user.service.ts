// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
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
export class UserService {
  private usersUrl = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<User[]>(this.usersUrl, { headers });
  }

  addUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(this.usersUrl, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<User>(`${this.usersUrl}${user.id}/`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.usersUrl}${id}/`, { headers });
  }
}