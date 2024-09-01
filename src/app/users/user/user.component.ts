import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdduserComponent } from '../adduser/adduser.component';
import { ShowuserComponent } from '../showuser/showuser.component';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allUsers!:User[];
  displayedColumns: string[] = ['firstname', 'lastname', 'mail','priority','specialty','type','actions'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private userService:UserService,private router:Router){ }

  ngOnInit(): void {
  
    const role=localStorage.getItem('role');
      if (role==="STUDENT" || !role ){
        this.router.navigate(['/notfound'])
      }
    this.fetchItems();
  }
  addDialog(){
    const dialogRef=this.dialog.open(AdduserComponent, {
      width: '700px',
      height:'450PX', 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchItems()
    });
  }
 
  
  fetchItems(){
    this.userService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.allUsers=this.allUsers.filter(user => user.state === 'APPROVED')
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  showUser(id:Number){
    this.dialog.open(ShowuserComponent, {
      width: '700px',
      height:'480PX', 
      data:{key:id}
    });
  }
  updateUser(id:Number){
    const dialogRef=this.dialog.open(UpdateuserComponent,{
      width: '700px',
      height:'450PX', 
      data:{key:id}
     });
     dialogRef.afterClosed().subscribe(result => {
      this.fetchItems()
    });
  }
  deleteUser(id:Number){
    this.userService.deleteUser(id).subscribe({
      next:() =>{alert("user deleted succesfuly"),
                    this.fetchItems()
    },
      error:(error)=>console.error(error)
    }
    )
  }
}
