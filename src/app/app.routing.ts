import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component'; 
import { LoginComponent } from './authentification/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { SuccespageComponent } from './succespage/succespage.component';
import { InactiveComponent } from './inactive/inactive.component';
import { ResetpassComponent } from './authentification/resetpass/resetpass.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {path:'reset',component:ResetpassComponent},
  {path:'inactive',component:InactiveComponent},
  {path:'success',component:SuccespageComponent},
  {path:'login',component:LoginComponent},
  {path:'inscri',component:InscriptionComponent},
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
  { path: 'notfound', component: NotfoundComponent}, 
  { path: '**', redirectTo: 'notfound' }
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
