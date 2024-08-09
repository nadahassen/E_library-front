import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component'; 
import { LoginComponent } from './authentification/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RessourceComponent } from './ressources/ressource/ressource.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {path:'login',component:LoginComponent},
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: 'etudiant',
    component: UserLayoutComponent, 
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/user-layout/user-layout.module').then(
            (m) => m.UserLayoutModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'notfound' }, 
  { path: 'notfound', component: NotfoundComponent}, 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
