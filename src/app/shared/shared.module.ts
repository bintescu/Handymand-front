import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { ContractInfoComponent } from './contract-info/contract-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    UserInfoComponent,
    ContractInfoComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UserInfoComponent,
    ContractInfoComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
