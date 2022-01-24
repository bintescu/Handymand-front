import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() firstName:string = "";
  @Input() lastName:string = "";

  @Output() onRemoveUser:EventEmitter<any> =  new EventEmitter<any>();
  
  public date =  new Date();
  constructor() { }

  ngOnInit(): void {
  }

  removeUser(firstNameValue:string){

    this.onRemoveUser.emit(firstNameValue);
  }
}
