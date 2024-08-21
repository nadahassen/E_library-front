export class Book {
    id_book: number;
    name: string;
    author: string;
    sujet: string;
    year: string;
    specialty: Specialty;
    available: boolean;
    reservations: Reservation[];
    base64Image: string;  // Add this line
    imageUrl :string
  
    constructor(
      id_book: number,
      name: string,
      author: string,
      sujet: string,
      year: string,
      specialty: Specialty,
      available: boolean,
      reservations: Reservation[],
      base64Image: string,
      imageUrl :string
      // Add this line
    ) {
      this.id_book = id_book;
      this.name = name;
      this.author = author;
      this.sujet = sujet;
      this.year = year;
      this.specialty = specialty;
      this.available = available;
      this.reservations = reservations;
      this.base64Image = base64Image; 
      this.imageUrl =imageUrl
      // Add this line
    }
  }
  
  export class Specialty {
    // Define properties for Specialty
  }
  
  export class Reservation {
    // Define properties for Reservation
  }
  