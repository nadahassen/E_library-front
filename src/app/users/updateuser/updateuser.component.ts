import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  userForm!: FormGroup;
  u:User;
  constructor(public dialogRef: MatDialogRef<UpdateuserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private userService: UserService,private http: HttpClient) { }

  ngOnInit(): void {
    this.userService.getUserById(this.data.key).subscribe(
      (res)=>{
        this.u=res;
        this.userForm=this.fb.group({
          firstname: [this.u.firstname, Validators.required],
          lastname: [this.u.lastname, Validators.required],
          mail: [this.u.mail, [Validators.required, Validators.email]],
          password: [this.u.password, Validators.required],
          priority: [this.u.priority, Validators.required],
          specialty: [this.u.specialty, Validators.required],
          type: [this.u.type, Validators.required],
          image: [this.u.image, Validators.required]
        });
      }
    )
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.u, // Spread the original user data
        ...this.userForm.value // Overwrite with updated form values
      };

      this.userService.updateUser(updatedUser).subscribe(response => {
        // Handle the response, such as closing the dialog
        this.dialogRef.close(updatedUser); // Pass back updated user object
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  resetForm(): void {
    this.userForm.reset();
  }
}
