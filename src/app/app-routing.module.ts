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
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { UsersComponent } from './pages/users/users.component';
import { ChatComponent } from './pages/chat/chat.component';


const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate:[HasPermissionGuard],
  },
  {
    path:'profile',
    component: ProfileComponent
  },{
    path:'home',
    component:HomeComponent,
    canActivate:[HasPermissionGuard]
  },{
    path:'joboffers',
    component:JobOffersComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'hire',
    component:HireComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'jobofferpage/:id',
    component:JobOfferPageComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'testjs',
    component:TestJsComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'myprofile',
    component:MyProfileComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'editprofile',
    component:EditProfileComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'unauthorized',
    component:UnauthorizedComponent
  },
  {
    path:'notfound',
    component:NotfoundComponent
  },
  {
    path:'skills',
    component:SkillsComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate:[HasPermissionGuard]
  },
  {
    path:'chat',
    component:ChatComponent
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: NotfoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
