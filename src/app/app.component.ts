import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy,OnInit{
  title = 'Handymand';
  faCoffee = faCoffee;
  token: string | null | undefined;

  private tokenExpired(token:string|null|undefined) {
    if(token != null && token != undefined){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    else{
      return true;
    }
  }
  
  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.tokenExpired(this.token)) {
      localStorage.clear();
    } else {
      // token valid
    }
  }

  ngOnDestroy(){
    localStorage.clear();
  }
}
