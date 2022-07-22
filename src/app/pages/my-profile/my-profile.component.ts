import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  faclipboard = faCopy;
  public user: User = {
    id : 0,
    username : '',
    email : '',
    firstName :'',
    lastName : '',
    password: '',
    location: '',
    walletAddress:'',
    aboutMe : '',
    address:'',
    phone:'',
    title:'',
    role: -1,
    birthday: null
  }

  age!:number;
  dateCreated!:Date;
  joiningDate!:string;
  birthdayString!:string;
  profileImage : File | undefined;

  @ViewChild('profileImage') profileImageElement!: ElementRef;
  constructor(private userService:UserService, private clipboard: ClipboardService) { }

  ngOnInit(): void {

    this.userService.getMyProfilePicture().subscribe((response:any) => {
      this.profileImageElement.nativeElement.src = "data:image;base64," + response.data;
    })
    const observer = {
      next: (rezult:any) => {
        this.user = rezult.data;
  
        this.user.birthday = new Date(Date.parse(rezult.data.birthday));
        if(this.user.birthday  != null){
          let year:number= Number(this.user.birthday.getFullYear());
          let today:number = Number(new Date().getFullYear());
          this.age = today - year;
          this.birthdayString = this.user.birthday.toLocaleDateString("en-US");
        }
        this.dateCreated = new Date(Date.parse(rezult.data.dateCreated));
        this.joiningDate = this.dateCreated.toLocaleDateString("en-US");
      },
      error : (err:any) => {
        console.log("eroare:")
        console.log(err);
      },
      complete: () => {
        console.log("complete!")
      }
    }

    this.userService.getMyuser().subscribe(observer)

  }


  copyWalletAdress(){
    var walletElem = document.getElementById("myWallet");
    if(walletElem != undefined){
      this.clipboard.copy(walletElem.innerHTML);
    }

  }
}
