import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { ContractInfoComponent } from './contract-info/contract-info.component';



@NgModule({
  declarations: [
    UserInfoComponent,
    ContractInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UserInfoComponent,
    ContractInfoComponent
  ]
})
export class SharedModule { }
