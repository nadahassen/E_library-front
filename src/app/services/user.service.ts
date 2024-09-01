import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';
import { BehaviorSubject, Observable , catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9100/library/user';
  private BaseUrl = 'http://localhost:9100/library';
  private roleSubject = new BehaviorSubject<string | null>(this.getRole());
  role$ = this.roleSubject.asObservable();
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+"/add", user);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getall`);
  }
  getUserById(id: Number): Observable<User> {
    const url = `${this.apiUrl+"/get"}/${id}`;
    return this.http.get<User>(url);
  }
  resetPassword(mail: String): Observable<String> {
    const url = `${this.apiUrl+"/forgotpassword"}/${mail}`;
    return this.http.post<String>(url,'');
  }
  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl+"/update"}`;
    return this.http.put<User>(url, user);
  }
  deleteUser(id: Number): Observable<void> {
    const url = `${this.apiUrl+"/delete"}/${id}`;
    return this.http.delete<void>(url);
  }  
  login(mail:string,password:string):Observable<any>{
    return  this.http.post('http://localhost:9100/library/user/login/'+mail+'/'+password, {},{ responseType: 'text' }).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
  decodeToken(token: any): any {
    if (typeof token !== 'string') {
      console.error('Invalid token:', token);
      return null;
    }
  
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('The token is invalid');
    }
  
    const decoded = JSON.parse(atob(parts[1]));
    return decoded;
  }
  getLoggedUser():Observable<User>{
    let id=localStorage.getItem("userId");
    const u=this.getUserById(Number(id));
    return u
  }
  
  setRole(role: string) {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isEtudiant(): boolean {
    return this.getRole() === 'Student';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.roleSubject.next(null);
  }
  acceptUser(id:Number): Observable<User>{
    const url = `${this.apiUrl+"/accept"}/${id}`;
    return this.http.put<User>(url,'');
  }
  getPhoto(photo: String): string{
    const photoUrl = `${this.BaseUrl}/download/${photo}`;

    return `${this.BaseUrl}/download/${photo}`;
  }
}
