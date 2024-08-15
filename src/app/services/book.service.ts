import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'app/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:9100/library/book'; // Adjust the base URL to match your backend configuration

  constructor(private http: HttpClient) { }

  addBook(bookData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, bookData);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getall`);
  }

  getBookById(id_book: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/getbook/${id_book}`);
  }

  updateBook(bookData: Book): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, bookData);
  }

  deleteBook(id_book: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id_book}`);
  }
}
