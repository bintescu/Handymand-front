import { Component,  Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss']
})
export class ContractInfoComponent implements OnInit {

  @Input() creationName:string = "";
  @Input() description:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
