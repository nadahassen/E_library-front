import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdduserComponent } from '../adduser/adduser.component';
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
  constructor(private dialog: MatDialog,private userService:UserService){ }

  ngOnInit(): void {
  
    this.userService.getLoggedUser().subscribe(
      (res)=>{
        console.log(res)
      },
      (err)=>{
        alert("veuillez connecter!!!")
      }
    )
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
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
