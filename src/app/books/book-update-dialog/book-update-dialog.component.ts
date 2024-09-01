import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'app/models/book';
import { BookService } from 'app/services/book.service';

@Component({
  selector: 'app-book-update-dialog',
  templateUrl: './book-update-dialog.component.html',
  styleUrls: ['./book-update-dialog.component.css']
})
export class BookUpdateDialogComponent implements OnInit {
  bookForm: FormGroup;
  selectedFile: File | null = null;
  available: boolean;
  image :any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private bookService: BookService
  ) {}

  ngOnInit(): void {    
    this.bookForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.minLength(2)]],
      author: [this.data.author, [Validators.required, Validators.minLength(2)]],
      sujet: [this.data.sujet, [Validators.required, Validators.minLength(2)]],
      year: [this.data.year, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      specialty: [this.data.specialty, [Validators.required]],
      available: [false]
    });
    if (this.data.base64Image) {
      this.image = "data:image/png;base64,"+this.data.base64Image

    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.image = e.target?.result;        
      };
      reader.readAsDataURL(file);
      this.selectedFile = input.files[0];

    }
  }

  onRemoveImage(): void {
    this.image = null; // Clear the current image
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the file input
    }
  }

  onSave(): void {
    if (this.bookForm.valid) {
      const updatedBook = { ...this.data, ...this.bookForm.value };
  
      // If an image is selected, convert it to a base64 string
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          // Add the base64 image to the book object
          updatedBook.base64Image = (reader.result as string).split(',')[1];
          updatedBook.imageUrl = (reader.result as string).split(',')[1];

          this.sendBookUpdate(updatedBook);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // If no image is selected, send the book object as is
        this.sendBookUpdate(updatedBook);
      }
    } else {
      console.warn('Form is not valid');
    }
  }
  private sendBookUpdate(book: Book): void {
    console.log(book);
    
    this.bookService.updateBook(book).subscribe(response => {
      this.dialogRef.close(response);
    }, error => {
      console.error('Error:', error);
    });
  }
  
  
  
  


  onCancel(): void {
    this.dialogRef.close();
  }
}
