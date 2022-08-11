import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { ContractInfoComponent } from './contract-info/contract-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobofferInfoComponent } from './joboffer-info/joboffer-info.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    UserInfoComponent,
    ContractInfoComponent,
    JobofferInfoComponent,
    FooterComponent,
    JobofferInfoComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ], 
  exports:[
    UserInfoComponent,
    ContractInfoComponent,
    JobofferInfoComponent,
    FooterComponent
  ]
})
export class SharedModule { }
