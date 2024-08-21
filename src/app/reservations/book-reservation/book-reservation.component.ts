import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from 'app/models/book';
import { BookService } from 'app/services/book.service';
import { BookDetailReservationComponent } from '../book-detail-reservation/book-detail-reservation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-reservation',
  templateUrl: './book-reservation.component.html',
  styleUrls: ['./book-reservation.component.css'], // Link to your CSS file
})
export class BookReservationComponent implements OnInit {
  searchForm: FormGroup;
  specialities = ['TWIN', 'ARCTIC', 'SAE', 'SIM']; // Example specialities
  books = [];
  criteria : any;
  constructor(private fb: FormBuilder, private bookService: BookService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      bookName: [''],
      availabilityDate: [''],
      speciality: ['']
    });


    // Initially load all books
    this.loadBooks();
    
  }

  loadBooks(): void {
    this.criteria = this.searchForm.value;
    this.bookService.getAllBooks().subscribe((result) => {
      this.books = result;
      console.log(this.books);
    });
  }

  onSearch(): void {
    this.criteria = this.searchForm.value;
    const searchCriteria = this.searchForm.value;  
    console.log(searchCriteria);
      
    this.bookService.searchBooks(searchCriteria).subscribe((result) => {
      this.books = result;      
    });
  }

  openBookDetail(book: Book): void {
    this.dialog.open(BookDetailReservationComponent, {
      data: {
        book: book,
        searchCriteria: this.criteria,  // Pass the search criteria
      },
      width: '500px',
    });
    
  }
}
