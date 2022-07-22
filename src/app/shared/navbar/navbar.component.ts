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

  @ViewChild('profileImage') profileImageElement!: ElementRef;
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    if(localStorage.getItem('name') != null){
      this.userService.getMyProfilePicture().subscribe((response:any) => {
        this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
      })
      var name = localStorage.getItem('name');
      console.log('NAME = ' + name)
      if(name !== null){
        this.loginName = name;
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
