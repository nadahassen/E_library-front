import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BookComponent } from './books/book/book.component';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { UserComponent } from './users/user/user.component';
import { RessourceComponent } from './ressources/ressource/ressource.component';
import { LoginComponent } from './authentification/login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { AdduserComponent } from './users/adduser/adduser.component';
import { MatButtonModule } from '@angular/material/button';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ResourceuserComponent } from './ressources/resourceuser/resourceuser.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BookComponent,
    ReservationComponent,
    SubjectComponent,
    UserComponent,
    RessourceComponent,
    LoginComponent,
    AdduserComponent,
    UserLayoutComponent,
    ResourceuserComponent,
    NotfoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
