import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9100/user';
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+"/add", user);
  }
  // Retrieve all categories
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getall`);
  }
  // Get a category by ID
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl+"/get"}/${id}`;
    return this.http.get<User>(url);
  }
  // Update an existing category by ID
  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl+"/update"}`;
    return this.http.put<User>(url, user);
  }
  // Delete a category by ID
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl+"/delete"}/${id}`;
    return this.http.delete<void>(url);
  }  
}
