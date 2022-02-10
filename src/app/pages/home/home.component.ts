import { Component, OnInit } from '@angular/core';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { Contract } from 'src/app/interfaces/contract';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faStickyNote = faStickyNote;
  public contracts?: Contract[];
  

  constructor(private contractsService: ContractsService) { }

  ngOnInit(): void {
  }

  getContracts(){
    this.contractsService.getContractsForHomePage().subscribe((response:any) => {
      this.contracts = response
      console.log(this.contracts);
    })
  }


}
