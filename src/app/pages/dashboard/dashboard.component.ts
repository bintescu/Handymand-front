import { Component, OnInit } from '@angular/core';
import { PrivateService } from 'src/app/services/private.service';
import { ContractsService } from 'src/app/services/contracts.service';
import {Contract} from 'src/app/interfaces/contract';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users:any[] = [
    {
    firstName:"Ana",
    lastName:"Popescu"
  },{
    firstName:"Ionel",
    lastName:"Dinescu"
  },
  {
    firstName:"Mihai",
    lastName:"Bobonete"
  }
];

  public contracts?: Contract[];

public loginName?: string ;
public searchText:string = '';
  constructor(private privateService: PrivateService, private contractsService: ContractsService ) { }

  ngOnInit(): void {
    var name = localStorage.getItem('name');
    if(name !== null){
      this.loginName = name;
    }

    this.getAllContracts();
  }

  getAllUsers(){
    this.privateService.getUsers().subscribe((response:any) => {
      this.users = response.allUsers;
    })
  }

  getAllContracts(){
    this.contractsService.getAllContracts().subscribe((response:any) => {
      this.contracts = response
      console.log(this.contracts);
    })
  }
  deleteUser(firstName:string){
    this.users = this.users.filter((user) => {
      return user.firstName !== firstName;
    })
  }

}
