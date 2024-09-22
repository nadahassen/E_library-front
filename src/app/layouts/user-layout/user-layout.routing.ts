import { Routes } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { BookReservationComponent } from 'app/reservations/book-reservation/book-reservation.component';
import { ResourceuserComponent } from 'app/ressources/resourceuser/resourceuser.component';
import { ProfileComponent } from 'app/users/profile/profile.component';
import { UpdateprofileComponent } from 'app/users/updateprofile/updateprofile.component';
export const UserLayoutRoutes: Routes = [
    { path: 'home',        component: HomeComponent },
    { path: 'ressource',   component: ResourceuserComponent },
    {path: 'books' ,  component:BookReservationComponent},
    { path: 'profile',   component: ProfileComponent },
    {path:'update', component:UpdateprofileComponent}
];