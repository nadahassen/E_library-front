import { Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.isLoggedIn = true;

      const role = localStorage.getItem('role');

      if (role === 'STUDENT') {
        this.router.navigate(['/etudiant/home']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  isEtudiant():boolean{
    const role = localStorage.getItem('role');
    return role === 'STUDENT';
  }
}

