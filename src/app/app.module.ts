import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { SearchFirstNamePipe } from './pipes/search-first-name.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { JobOffersComponent } from './pages/job-offers/job-offers.component';
import { HireComponent } from './pages/hire/hire.component';
import { JobOfferPageComponent } from './pages/job-offer-page/job-offer-page.component';
import { TestJsComponent } from './pages/test-js/test-js.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SkillsComponent } from './pages/skills/skills.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UsersComponent } from './pages/users/users.component';
import { DialogUserComponent } from './shared/dialog-user/dialog-user.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DialogJobofferComponent } from './shared/dialog-joboffer/dialog-joboffer.component';
import { ChatComponent } from './pages/chat/chat.component';
import { FreelancersComponent } from './pages/freelancers/freelancers.component';
import { OfferInfoComponent } from './shared/offer-info/offer-info.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { JobclosedComponent } from './pages/jobclosed/jobclosed.component';
import { DialogCloseContractComponent } from './shared/dialog-close-contract/dialog-close-contract.component';
import { DialogDeleteJobofferComponent } from './shared/dialog-delete-joboffer/dialog-delete-joboffer.component';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { UserInfoComponent } from './shared/user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    SearchFirstNamePipe,
    HomeComponent,
    JobOffersComponent,
    HireComponent,
    JobOfferPageComponent,
    TestJsComponent,
    MyProfileComponent,
    EditProfileComponent,
    UnauthorizedComponent,
    NotfoundComponent,
    SkillsComponent,
    DialogComponent,
    UsersComponent,
    DialogUserComponent,
    DialogJobofferComponent,
    DialogCloseContractComponent,
    DialogDeleteJobofferComponent,
    ChatComponent,
    FreelancersComponent,
    OfferInfoComponent,
    NavbarComponent,
    JobclosedComponent,
    StarRatingComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorsInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
