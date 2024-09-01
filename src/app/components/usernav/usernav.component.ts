import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  u:User;
  constructor(private router:Router,private userService:UserService) { }
  navigate(route: string) {
    this.router.navigate([`/etudiant/${route}`]);
    this.closeMenu();
  }
  ngOnInit(): void {
    const id=localStorage.getItem("userId");
        this.userService.getUserById(Number(id)).subscribe(
            (res)=>{
                this.u=res;
            }
        )
  }
  closeMenu() {
    const checkbox = document.getElementById('menu-icon') as HTMLInputElement;
    checkbox.checked = false;
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['/login'])
}
getAdminPhotoUrl(user: User): string {
  return this.userService.getPhoto(user.image);
  
}

}
