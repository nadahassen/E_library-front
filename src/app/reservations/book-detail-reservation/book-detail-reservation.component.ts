import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'app/models/book';
import { Reservation } from 'app/models/reservation';
import { BookService } from 'app/services/book.service';
import { ReservationService } from 'app/services/reservation.service';

@Component({
  selector: 'app-book-detail-reservation',
  templateUrl: './book-detail-reservation.component.html',
  styleUrls: ['./book-detail-reservation.component.css']
})
export class BookDetailReservationComponent implements OnInit{
  reservationDate: Date | null = null;
  minDate: Date;
  reserveForm: FormGroup;

  oneWeekChecked = false;
  twoWeeksChecked = false;
  book: Book;
  searchCriteria: any;
  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookDetailReservationComponent>,
    private fb: FormBuilder,
    private reservationService : ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.book = data.book;
    this.searchCriteria = data.searchCriteria;
  }

  ngOnInit(): void {
    this.minDate = new Date();

    if (this.searchCriteria.availabilityDate)
      {
        this.reservationDate = this.searchCriteria.availabilityDate ? new Date(this.searchCriteria.availabilityDate) : new Date();
      }

      this.reserveForm = this.fb.group({
        reservationDate: [this.reservationDate, Validators.required],
        duration: [null, Validators.required],
        reserveButton: [{ value: '', disabled: false }] // Control for reserve button
      });
  }


  onClose(): void {
    this.dialogRef.close();
  }

  onReserve(): void {
    if (!this.reservationDate) {
      alert('Please select a reservation date.');
      return;
    }

    const reservationDuration = this.oneWeekChecked ? 7 : this.twoWeeksChecked ? 14 : null;

    if (!reservationDuration) {
      alert('Please select a reservation duration.');
      return;
    }
const reservation = {
    
      "reservation_date": this.getFormatDate(this.reservationDate),
      "return_date": this.getFormatDate(this.addDays(this.reservationDate,reservationDuration)),
      "status": 2,
      "user":{
          "id_user" : 1
      },
      "book":{
          "id_book" :this.book.id_book
      } 
  }

  this.reservationService.addReservation(reservation).subscribe(response => {
    console.log(response);
    
  });

    // Handle the reservation logic here (e.g., send the reservation request to the server)

    alert(`Reservation request for ${this.book.name} on ${this.reservationDate.toLocaleDateString()} for ${reservationDuration} days submitted.`);
    this.dialogRef.close();
  }

  onDateChange(newDate: Date): void {
    this.reservationDate = newDate;
    const formattedDate = this.getFormatDate(newDate);
    this.searchCriteria.availabilityDate = formattedDate
    this.searchCriteria.bookName = this.book.name
    this.bookService.searchBooks(this.searchCriteria).subscribe((result) => {
      if (result.length === 0) {
        // Disable reserve button and add form control error
        this.reserveForm.controls['reserveButton'].disable();
        this.reserveForm.controls['reservationDate'].setErrors({ notAvailable: true });
      } else {
        // Enable reserve button and clear form control error
        this.reserveForm.controls['reserveButton'].enable();
        this.reserveForm.controls['reservationDate'].setErrors(null);
      }      

    });  }


    getFormatDate(newDate : Date) : String{
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate
    }

     addDays(date: Date, days: number): Date {
      const result = new Date(date); // Create a new Date object to avoid mutating the original date
      result.setDate(result.getDate() + days); // Add the number of days
      return result;
    }


    

}
