import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasPermissionGuard } from './guards/has-permission.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[HasPermissionGuard],
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate:[HasPermissionGuard],
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
