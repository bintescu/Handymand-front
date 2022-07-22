import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {

  constructor(private router:Router){

  }

  //https://jasonwatmore.com/post/2020/09/09/angular-10-role-based-authorization-tutorial-with-example
  //https://www.rdegges.com/2018/please-stop-using-local-storage/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('s-a activat guardul');
    console.log('state :')
    console.log(state);
    console.log('route:')
    console.log(route);
    console.log('local Storage permissions :');
    console.log(localStorage.getItem("permissions"));

    //Verificam ce path-uri de permisiuni are in ls
    //Daca nu are permisiuni setate poate accesa doar HOME SCREEN
    if(localStorage.getItem("permissions")){
      const permissions = JSON.parse(localStorage.getItem("permissions")!);
      console.log('am luat permisiunile :')
      console.log(permissions)
      if(!permissions[route.routeConfig?.path!]){
        this.router.navigate(['/login']);
        return false;
      }
    }
    else{
      this.router.navigate(['/home']);
    }


    return true;
  }
  
}
