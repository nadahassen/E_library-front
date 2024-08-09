import { Routes } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { ResourceuserComponent } from 'app/ressources/resourceuser/resourceuser.component';
export const UserLayoutRoutes: Routes = [
    { path: 'home',        component: HomeComponent },
    { path: 'ressource',   component: ResourceuserComponent },
];