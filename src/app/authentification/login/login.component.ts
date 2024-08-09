import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  email: string = '';
  password: string = '';

  constructor(private userService:UserService,private router : Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this.userService.login(this.email,this.password).subscribe(
        (res)=>{
          console.log(res);
          if (res==="Verifier votre données")
            {
              alert("Verifier vos données!!");
              
            }else{
            const token = this.userService.decodeToken(res);
            
            if (token){
              localStorage.setItem('token', JSON.stringify(token));
              localStorage.setItem('userId', token.userId);
              localStorage.setItem('role', token.role); 
              this.userService.setRole(token.role); 
              if (token.role === 'Student') {
                this.router.navigate(['/etudiant/home']);
              } else {
                this.router.navigate(['/dashboard']);
              }
            }
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }

}
