import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    const id=localStorage.getItem("userId");
    this.userService.getUserById(Number(id)).subscribe(
        (res)=>{
            this.user=res;
        }
    )
  }
  getAdminPhotoUrl(user: User): string {
    return this.userService.getPhoto(user.image);
    
  }
  updateProfile(){
    this.router.navigate(['/etudiant/update']);
  }
}
