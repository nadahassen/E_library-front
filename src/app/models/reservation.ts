import { Book } from "./book";
import { User } from "./user.model";

export class Reservation {
    id_reservation: number;
  reservation_date: Date;
  return_date: Date;
  status: Status;
  user: User;
  book: Book;

  constructor(
    id_reservation: number,
    reservation_date: Date,
    return_date: Date,
    status: Status,
    user: User,
    book: Book
  ) {
    this.id_reservation = id_reservation;
    this.reservation_date = reservation_date;
    this.return_date = return_date;
    this.status = status;
    this.user = user;
    this.book = book;
  }
}
export enum Status {
    // Define your status values here, for example:
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    PENDING = 'PENDING',
    LATE = 'LATE',
    DONE = 'DONE'
  }
