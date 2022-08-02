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




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UsersComponent } from './pages/users/users.component';

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
    UsersComponent
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
    MatSortModule
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
