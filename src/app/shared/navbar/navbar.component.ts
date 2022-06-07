import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loginName?: string ;
  faUserCircle = faUserCircle;
  public loginId?: string;
  constructor(private router:Router) { }

  ngOnInit(): void {

    var name = localStorage.getItem('name');
    console.log('NAME = ' + name)
    if(name !== null){
      this.loginName = name;
    }
    var IdLoggedIn = localStorage.getItem('loggedInId');
    if(IdLoggedIn !== null){
     this.loginId = IdLoggedIn
    }
  }

  signOut(): void{
    localStorage.clear();
    console.log('signed out!')
  }

  goToProfile(): void{
    console.log('this Login ID:',this.loginId)
    this.router.navigate(['/profile/'+this.loginId])
  }

}
