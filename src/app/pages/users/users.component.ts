import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { DialogUserComponent } from 'src/app/shared/dialog-user/dialog-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'firstName','lastName', 'walletAddress','amount','aboutMe','address','phone','title','dateCreated','birthday','blocked','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort)sort!: MatSort;
  
  constructor(private dialog:MatDialog, private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(){
    const observer = {
      next: (res:any) => {
        console.log(res.data)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err:any) => {
        console.log('error on get users!')
      }
    }
    this.userService.getAll().subscribe(observer);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
    width:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'save'){
        this.getUsers();
      }
    });
  }

  editUser(row:any):void{
    this.dialog.open(DialogUserComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe( result => {
      this.getUsers();
    });
  }

  blockUser(row:any):void{
    const observer = {
      next: (result : any ) => {
        if(row.blocked == false){
          alert('User blocked!');
        }
        else{
          alert('User unblocked!')
        }
        
        this.getUsers();
      },
      error: (err:any) =>{
        alert('Error when try to block user!');
        console.log(err);
      }
    }

    this.userService.block(row).subscribe(observer);
  }

  deleteUser(row:any):void{
    const observer = {
      next: (result : any ) => {
        alert('User deleted!');
        this.getUsers();
      },
      error: (err:any) =>{
        alert('Error when try to delete user!');
        console.log(err);
      }
    }

    this.userService.delete(row).subscribe(observer);
  }
}
