import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'app/services/book.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  bookForm: FormGroup;
  selectedFile: File | null = null;
  image :any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      sujet: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Year must be a 4-digit number
      specialty: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      available: [true]
    });
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

  save(): void {
    if (this.bookForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('book', new Blob([JSON.stringify(this.bookForm.value)], { type: 'application/json' }));
      formData.append('image', this.selectedFile);
      

      this.bookService.addBook(formData).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }

  onRemoveImage(): void {
    this.image = null; // Clear the current image
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the file input
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
