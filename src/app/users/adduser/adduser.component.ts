import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AdduserComponent>,private fb: FormBuilder,private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      priority: ['', Validators.required],
      specialty: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe(response => {
        alert("user added succesfully!!");
        this.dialogRef.close();
      }, error => {
        console.error('Error creating user', error);
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
  }
}
