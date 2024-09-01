import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'app/models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  image :any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Book,

  ) { }

  ngOnInit(): void {
    this.image = "data:image/png;base64,"+this.data.base64Image
    console.log(this.data.base64Image);
    
  }

}
