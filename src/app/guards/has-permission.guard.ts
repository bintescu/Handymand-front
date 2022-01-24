import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {

  constructor(private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(state,route);

    if(localStorage.getItem("permissions")){
      const premissions = JSON.parse(localStorage.getItem("permissions")!);
      if(!premissions[route.routeConfig?.path!]){
        this.router.navigate(['/login']);
        return false;
      }
    }


    return true;
  }
  
}
