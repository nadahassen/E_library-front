import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { UserLayoutRoutes } from './user-layout.routing';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(UserLayoutRoutes),
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatRippleModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTooltipModule,
    ],
    declarations: [
     HomeComponent
    ]
  })
  
  export class UserLayoutModule {}