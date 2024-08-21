import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation, Status } from 'app/models/reservation';
import { ReservationService } from 'app/services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'app/books/confirmation-dialog/confirmation-dialog.component';
import { User } from 'app/models/user.model';
import { Book } from 'app/models/book';
import { BookDetailsComponent } from 'app/books/book-details/book-details.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = ['id_reservation', 'reservation_date', 'return_date', 'status', 'user', 'priority' , 'book', 'actions'];
  dataSource: MatTableDataSource<Reservation>;
  reservations: Reservation[] = []; // Initialize as an empty array
  showBookDetailsModal = false;
  selectedBook:Book;
  filter: ReservationFilter = {}; // Initialize the filter object

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reservationService: ReservationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe((reservations: Reservation[]) => {
      this.dataSource = new MatTableDataSource(reservations);
      this.reservations = reservations;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
    }, error => {
      console.error('Error fetching reservations', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { name: `Reservation ${reservation.id_reservation}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.deleteReservation(reservation.id_reservation).subscribe(() => {
          this.loadReservations(); // Reload reservations after one is deleted
        });
      }
    });
  }

  approveReservation(reservation: Reservation) {
    reservation.status = Status.APPROVED
    this.reservationService.updateReservation(reservation).subscribe(()=>
    this.loadReservations)  }
  
  declineReservation(reservation: any) {
    reservation.status = Status.DECLINED

    // Implement your logic to decline the reservation here
    // This example just alerts for now
    this.reservationService.updateReservation(reservation).subscribe(()=>
      this.loadReservations)    }

  
    getStatusIcon(status: string): string {
      switch (status) {
        case 'APPROVED':
          return 'check_circle';
        case 'DECLINED':
          return 'cancel';
        case 'PENDING':
          return 'hourglass_empty';
        case 'LATE':
          return 'timer';
        case 'DONE':
          return 'done_all';
        default:
          return 'help_outline'; // Default icon if status is unknown
      }
    }
    
    getStatusColor(status: string): string {
      switch (status) {
        case 'APPROVED':
          return '#00A0E9';
        case 'DECLINED':
          return 'red';
        case 'PENDING':          
          return 'yellow';
        default:
          return '';
      }
    }

    showUserDetails(user: User) {
      // Implement your logic here to display user details
      console.log('User clicked:', user);
      // You might want to navigate to a user details page or display a dialog
    }
    showBookDetails(book:Book){
      const dialogRef = this.dialog.open(BookDetailsComponent, {
        width: '600px',
        data: { ...book }
      });
      
    }
    closeBookDetailsModal(){
      this.showBookDetailsModal = false;

    }
    filterReservations() {
      const filteredData = this.reservations.filter(reservation => {
        // Handle case-insensitive and whitespace for user name
        const filterValue = this.filter.username?.trim().toLowerCase() || '';
        const fullName = `${reservation.user.firstname.trim()} ${reservation.user.lastname.trim()}`.toLowerCase();
        const usernameMatch = filterValue ? fullName.includes(filterValue) : true; // Allow all reservations if filter is empty
    
        // Existing book name and status filtering logic
        const bookNameMatch = !this.filter.bookName || reservation.book.name.toLowerCase().includes(this.filter.bookName.toLowerCase());
        const statusMatch = !this.filter.status || reservation.status === this.filter.status;
    
        // Return reservations that match all filter criteria
        return usernameMatch && bookNameMatch && statusMatch;
      });
    
      this.dataSource = new MatTableDataSource(filteredData);
    }

    sortData(sort: MatSort) {
      if (!sort.active || sort.direction === '') {
        return;
      }
  
      this.dataSource.sortData = (data: any[]) => {
        return data.sort((a, b) => this.sortReservations(a, b));
      };
    }


    sortReservations(reservationA: any, reservationB: any) {
      // Check for priority differences
      if (reservationA.user.priority !== reservationB.user.priority) {
        return reservationA.user.priority > reservationB.user.priority ? -1 : 1;
      }
    
      // If priorities are equal, use another sorting criterion (e.g., reservation date)
      return new Date(reservationA.reservation_date).getTime() - new Date(reservationB.reservation_date).getTime();
    }
    markAsDone(reservation){
      reservation.status = Status.DONE;
      this.reservationService.updateReservation(reservation).subscribe(()=>
        this.loadReservations)

    }
}

export interface ReservationFilter {
  username?: string;
  bookName?: string;
  status?: string;
}
