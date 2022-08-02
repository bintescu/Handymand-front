import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loginName?: string ;
  faUserCircle = faUserCircle;
  public loginId?: string;
  public adminMode?:boolean = false;

  
  @ViewChild('profileImage') profileImageElement!: ElementRef;
  constructor(private router:Router, private userService:UserService) { }


  parseJwt(token:string|null|undefined) {
    if(token != null && token != undefined){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

  }


  ngOnInit(): void {

    const observer = {
      next: (response:any) => {
        this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
      },
      error: (err:any) => {
        //console.log("This user doesn`t have profile image!");
      }
    }
    if(localStorage.getItem('name') != null){
      this.userService.getMyProfilePicture().subscribe(observer)
      var name = localStorage.getItem('name');
      if(name !== null){
        this.loginName = name;
      }

      var token = localStorage.getItem('token');
      if(token != null){
        var role = this.parseJwt(token).role;

        if(role == 0){
          this.adminMode = true;
        }
      }

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
  
  myProfile():void{
    this.router.navigate(['myprofile'])
  }

}
