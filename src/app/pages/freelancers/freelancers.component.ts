import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrls: ['./freelancers.component.scss']
})
export class FreelancersComponent implements OnInit {

  public noOfItems ?:number = 0;
  
  length = 3;
  pageSize = 3;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 6, 9, 12];
  previousPageIndex: number | undefined;

  token:string|null|undefined = null;

  userList:User[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public myForm!:UntypedFormGroup;


  constructor(private formBuilder:UntypedFormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name:[''],
      ratingAsFreelancer:null,
      ratingAsCustomer:null
    })

    this.getAllUsers()
  }


  setTotalPages(){

    const observer = {
      next: (response:any) => {

        this.length = response.data;
      },
      error: (err:any) => {
        this.length = 1;
        console.log('eroare')
        console.log(err);
      }
    }

    this.userService.getTotalLength(this.myForm.value).subscribe(observer);
  }


  getAllUsers(){

    const observer = {

      next: (response:any) => {

        this.userList = response.data;
        console.log("am adus de la sv urmatorii useri:");
        console.log(this.userList);
        this.noOfItems = this.userList?.length;
      },
      error: (err:any) => {
        console.log('avem eroare:')
        console.log(err);
      }
    }

    this.userService.getAllUsers(this.currentPage,this.pageSize,this.myForm.value).subscribe(observer);
    this.setTotalPages();
  }


  clearFilter(){
    this.myForm.reset();
    this.getAllUsers();
  }


  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.previousPageIndex = event.previousPageIndex;
    this.getAllUsers();
  }

}
