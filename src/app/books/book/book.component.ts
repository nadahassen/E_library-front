import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'app/models/book';
import { BookService } from 'app/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { BookUpdateDialogComponent } from '../book-update-dialog/book-update-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  displayedColumns: string[] = ['id_book', 'name', 'author', 'sujet', 'year', 'specialty', 'available', 'actions'];
  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      console.log(books);
      
      this.dataSource = new MatTableDataSource(books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching books', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks(); // Reload books after a new book is added
      }
    });
  }

  editBook(book: Book): void {
    const dialogRef = this.dialog.open(BookUpdateDialogComponent, {
      width: '600px',
      data: { ...book }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.updateBook(result).subscribe(updatedBook => {
          const books = this.dataSource.data;
          const index = books.findIndex(b => b.id_book === updatedBook.id_book);
          if (index !== -1) {
            books[index] = updatedBook;
            this.dataSource.data = books; // Refresh the table
          }
        });
      }
    });
  }

  deleteBook(book: Book): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { name: book.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(book.id_book).subscribe(() => {
          this.loadBooks(); // Reload books after a book is deleted
        });
      }
    });
  }
}
