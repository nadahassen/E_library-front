import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})
export class ShowuserComponent implements OnInit {
  u:User;
  constructor(public dialogRef: MatDialogRef<ShowuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.data.key).subscribe(
      (res)=>{
        this.u=res;
      },
      (err)=>{
        alert("erreur")
      }
    )
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
