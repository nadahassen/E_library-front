import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailReservationComponent } from './book-detail-reservation.component';

describe('BookDetailReservationComponent', () => {
  let component: BookDetailReservationComponent;
  let fixture: ComponentFixture<BookDetailReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
