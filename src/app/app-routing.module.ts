import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasPermissionGuard } from './guards/has-permission.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import { JoboffersService } from './services/joboffers.service';
import { JobOffersComponent } from './pages/job-offers/job-offers.component';
import { HireComponent } from './pages/hire/hire.component';
import { JobOfferPageComponent } from './pages/job-offer-page/job-offer-page.component';
import { TestJsComponent } from './pages/test-js/test-js.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate:[HasPermissionGuard],
  },
  {
    path:'profile/:id',
    component: ProfileComponent
  },{
    path:'home',
    component:HomeComponent
  },{
    path:'joboffers',
    component:JobOffersComponent
  },
  {
    path:'hire',
    component:HireComponent
  },
  {
    path:'jobofferpage',
    component:JobOfferPageComponent
  },
  {
    path:'testjs',
    component:TestJsComponent
  },
  {
    path:'myprofile',
    component:MyProfileComponent
  },
  {
    path:'editprofile',
    component:EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
